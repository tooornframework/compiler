import {NoArgsConstructorClass} from "common/misc/utils/Class";

type ConfigurationProxy<T extends object> = {
    [K in keyof T]: (value: T[K]) => ConfigurationProxy<T>
}

type ConfigurationExtractor<T> = {
    [K in keyof T]: () => T[K] | null
}

export class Configuration {
    private static EXTRACT_SYMBOL = Symbol();

    public static extract<T extends object>(value: ConfigurationProxy<T>): ConfigurationExtractor<T> {
        const target = value[Configuration.EXTRACT_SYMBOL];
        if (!target) {
            throw new Error("No configuration was found");
        }

        return new Proxy(target, {
            get: this.createExtractorProxyGetter(target)
        })
    }

    public static of<T extends object>(Clazz?: NoArgsConstructorClass<T>): ConfigurationProxy<T> {
        const instance = this.createConfigurationProxyTargetInstance(Clazz);

        const proxy = new Proxy<any>(instance, {
            get: this.createConfigurationProxyGetter(instance, () => proxy)
        });

        return proxy;
    }

    private static createConfigurationProxyTargetInstance(Clazz?: NoArgsConstructorClass<object>): object {
        return  Clazz ? new Clazz() : {};
    }

    private static createExtractorProxyGetter(instance: object) {
        return (target: any, p: PropertyKey) => {
            return instance[p];
        }
    }

    private static createConfigurationProxyGetter(instance: object, getProxy: () => any) {
        return (target: any, p: PropertyKey) => {
            if (p === Configuration.EXTRACT_SYMBOL) {
                return instance;
            }

            return (value: unknown) => {
                instance[p] = value;
                return getProxy();
            }
        }
    }
}