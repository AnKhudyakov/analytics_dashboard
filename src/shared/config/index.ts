export function nonNull<T>(value: T, message: string): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(message);
  } else {
    return value!;
  }
}

function requireStringEnvVar(name: string) {
  return nonNull(
    import.meta.env[name],
    `Environment variable ${name} is not defined.`
  );
}

export const config = {
  backendUrl: requireStringEnvVar('VITE_API_URL'),
};
