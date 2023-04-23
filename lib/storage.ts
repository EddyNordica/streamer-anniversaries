import React from "react";

/**
 * Represents a key-value pair storage.
 */
interface IStorage<TKey> {
  get(key: TKey): string | undefined;
  set(key: TKey, value: string): void;
}

class MemoryStorage implements IStorage<string> {
  private readonly storage: Record<string, string>;
  constructor() {
    this.storage = {};
  }

  public get(key: string): string | undefined {
    return this.storage[key];
  }
  public set(key: string, newValue: string) {
    this.storage[key] = newValue;
  }
}

class LocalStorage implements IStorage<LocalSettingsKey> {
  public get(key: LocalSettingsKey): string | undefined {
    return localStorage.getItem(key) ?? undefined;
  }

  public set(key: LocalSettingsKey, newValue: string): void {
    localStorage.setItem(key, newValue);
  }
}

class SessionStorage implements IStorage<SessionSettingsKey> {
  public get(key: SessionSettingsKey): string | undefined {
    return sessionStorage.getItem(key) ?? undefined;
  }

  public set(key: SessionSettingsKey, newValue: string): void {
    sessionStorage.setItem(key, newValue);
  }
}

const createLocalStorage = (): IStorage<LocalSettingsKey> => {
  try {
    // Try to read a value to see local storage can be used.
    localStorage.getItem("");
  } catch {
    return new MemoryStorage();
  }

  return new LocalStorage();
};

const createSessionStorage = (): IStorage<SessionSettingsKey> => {
  try {
    // Try to read a value to see session storage can be used.
    sessionStorage.getItem("");
  } catch {
    return new MemoryStorage();
  }

  return new SessionStorage();
};

const lStorage = createLocalStorage();
const sStorage = createSessionStorage();

/**
 * Returns a local storage used for this app.
 */
export const useLocalStorage = (): IStorage<LocalSettingsKey> | undefined => {
  const [storage, setStorage] = React.useState<IStorage<LocalSettingsKey>>();

  React.useEffect(() => {
    setStorage(lStorage);
  }, []);

  return storage;
};

/**
 * Returns a session storage used for this app.
 */
export const useSessionStorage = ():
  | IStorage<SessionSettingsKey>
  | undefined => {
  const [storage, setStorage] = React.useState<IStorage<SessionSettingsKey>>();

  React.useEffect(() => {
    setStorage(sStorage);
  }, []);

  return storage;
};

export const booleanParser = (value: unknown): boolean | undefined => {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  } else {
    return undefined;
  }
};

export const defaultSerializer = (value: unknown) => `${value}`;

/**
 * The local storage settings.
 */
export const LocalSettings = [
  /**
   * A search form filter that specifies the currently selected anniversary.
   */
  "filter:anniversary",

  /**
   * A search form filter that specifies the currently selected regions.
   */
  "filter:regions",

  /**
   * A search form filter that specifies whether to hide graduated streamers.
   */
  "filter:hideGraduated",
] as const;
export type LocalSettingsKey = (typeof LocalSettings)[number];

/**
 * The session storage settings.
 */
export const SessionSettings = [
  /**
   * A value indicating whether the search form filters are shown.
   */
  "filtersShown",
] as const;
export type SessionSettingsKey = (typeof SessionSettings)[number];

interface SettingsOptions<T> {
  defaultValue: T;
  parser: (value: string | undefined) => T | undefined;
  serializer?: (value: T) => string;
}

const useStoredSetting = <T, TKey>(
  storage: IStorage<TKey> | undefined,
  key: TKey,
  options: Required<SettingsOptions<T>>
): [T, (value: T) => void] => {
  const [setting, _setSetting] = React.useState<T>(
    options.parser(storage?.get(key)) ?? options.defaultValue
  );

  const setSetting = React.useCallback(
    (newValue: T) => {
      _setSetting(newValue);
      storage?.set(key, options.serializer(newValue));
    },
    [storage, key, options.serializer]
  );

  return [setting, setSetting];
};

/**
 * Returns a React state that can be persisted in the local storage.
 */
export const useLocaleSetting = <T>(
  key: LocalSettingsKey,
  options: SettingsOptions<T>
) => {
  const storage = useLocalStorage();
  return useStoredSetting(storage, key, {
    ...options,
    serializer: options.serializer ?? defaultSerializer,
  });
};

/**
 * Returns a React state that can be persisted in the session storage.
 */
export const useSessionSetting = <T>(
  key: SessionSettingsKey,
  options: SettingsOptions<T>
) => {
  const storage = useSessionStorage();
  return useStoredSetting(storage, key, {
    ...options,
    serializer: options.serializer ?? defaultSerializer,
  });
};
