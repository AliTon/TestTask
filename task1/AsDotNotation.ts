type ArrayKeysMap = readonly ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

type KeyOfArray<T extends readonly any[]> = T extends readonly [infer First, ...infer Rest]
    ? First extends string | number
        ? First | KeyOfArray<Rest>
        : never
    : never;

type DotNotationForObject<T> = T extends object
    ? { [K in keyof T]: `${K & string}` | `${K & string}.${DotNotationForObject<T[K]>}` }[keyof T]
    : never;

type AsDotNotation<T> = DotNotationForObject<T> | KeyOfArray<ArrayKeysMap>;

// Test
const data = {
    device: {
        id: 1,
        meta: {
            name: "Hello, World!",
        },
    },
    user: {
        roles: [
            {
                role: "admin",
            },
            {
                role: "user",
            },
        ],
        getInfo: (): void => {},
    },
} as const;

const arrayKeysMap = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
] as const;

type DataDotNotationTest = AsDotNotation<typeof data>;
const result: DataDotNotationTest = "user.roles.second.role"

// Result: type DataDotNotationTest = "user.getInfo" | "user.roles.first.role" | "user.roles.second.role" | "device.id" | "device.meta.name"


type PickValueByDotNotation<T, K extends AsDotNotation<T>> =
    K extends `${infer First}.${infer Rest}`
        ? First extends keyof T
            ? Rest extends AsDotNotation<T[First]>
                ? PickValueByDotNotation<T[First], Rest>
                : never
            : never
        : K extends keyof T
            ? T[K]
            : never;

type Factory<T> = <K extends AsDotNotation<T>>(key: K) => PickValueByDotNotation<T, K>;

function factory<T>(data: T): Factory<T> {
    return function <K extends AsDotNotation<T>>(key: K): PickValueByDotNotation<T, K> {
        const keys = key.split('.') as (keyof T)[];

        let result: any = data;

        for (const k of keys) {
            result = result[k];
        }

        return result;
    };
}

// Test
type PickValueByDotNotationTest = PickValueByDotNotation<typeof data, "device.id">;
// Result: type PickValueByDotNotationTest = 1

type PickValueByDotNotationTest2 = PickValueByDotNotation<typeof data, "user.getInfo">;
// Result: type PickValueByDotNotationTest2 = () => void

type PickValueByDotNotationTest3 = PickValueByDotNotation<typeof data, "user.roles.first.role">;
// Result: type PickValueByDotNotationTest3 = "admin"

type PickValueByDotNotationTest4 = PickValueByDotNotation<typeof data, "user.roles.second.role">;
// Result: type PickValueByDotNotationTest4 = "user"

const pickValueByDotNotation = factory(data);

const deviceId = pickValueByDotNotation("device.id");
const deviceName = pickValueByDotNotation("device.meta.name");
const userRolesFirstRole = pickValueByDotNotation("user.roles.first.role");
const userRolesSecondRole = pickValueByDotNotation("user.roles.second.role");
const userGetInfo = pickValueByDotNotation("user.getInfo");

console.log({
    deviceId,
    deviceName,
    userRolesFirstRole,
    userRolesSecondRole,
    userGetInfo,
});

