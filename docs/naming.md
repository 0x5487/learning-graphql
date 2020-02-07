## Naming conventions

The GraphQL specification is flexible and doesn't impose specific naming guidelines. However, it's helpful to establish a set of conventions to ensure consistency across your organization. We recommend the following:

- **Field names** should use `camelCase`. Many GraphQL clients are written in JavaScript, Java, Kotlin, or Swift, all of which recommend `camelCase` for variable names.
- **Type names** should use `PascalCase`. This matches how classes are defined in the languages mentioned above.
- **Enum names** should use `PascalCase`.
- **Enum values** should use `ALL_CAPS`, because they are similar to constants.

These conventions help ensure that most clients don't need to define extra logic to transform the results returned by your server.