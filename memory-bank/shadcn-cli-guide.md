# shadcn CLI Guide

This guide provides detailed information on using the shadcn CLI for managing components in your project.

## Installation

The shadcn CLI is typically used via npx, which runs the latest version without global installation:

```bash
npx shadcn@latest <command>
```

## Commands

### 1. init

Initializes a new project with shadcn/ui configuration and dependencies.

**Usage:**

```bash
npx shadcn@latest init
```

**Options:**

- `-d, --defaults`: Use default values (new-york style, zinc color, CSS variables).
- `-f, --force`: Force overwrite of existing components.json.
- `-y, --yes`: Skip confirmation prompt.
- `-c, --cwd <cwd>`: Specify the working directory.

**Example:**

```bash
npx shadcn@latest init -d
```

### 2. add

Adds components and their dependencies to your project.

**Usage:**

```bash
npx shadcn@latest add [component]
```

**Options:**

- `-y, --yes`: Skip confirmation prompt.
- `-o, --overwrite`: Overwrite existing files.
- `-c, --cwd <cwd>`: Specify the working directory.
- `-a, --all`: Add all available components.
- `-p, --path <path>`: Specify the path to add the component to.

**Example:**

```bash
npx shadcn@latest add button
```

### 3. build

Generates registry JSON files for component distribution.

**Usage:**

```bash
npx shadcn@latest build
```

**Options:**

- `-o, --output <path>`: Specify the destination directory for JSON files.
- `-c, --cwd <cwd>`: Specify the working directory.

**Example:**

```bash
npx shadcn@latest build --output ./public/registry
```

## Best Practices

1. **Initialization:**
   - Run `init` command at the start of your project.
   - Document the configuration choices made during initialization.

2. **Adding Components:**
   - Use the `add` command for each new component.
   - Add multiple related components at once when possible.
   - Document any customizations made after adding components.

3. **Building:**
   - Incorporate the `build` command into your project's build process.
   - Specify a consistent output directory for registry files.

4. **Version Control:**
   - Commit changes made by the CLI to version control.
   - Include the components.json file in your repository.

5. **Documentation:**
   - Keep a log of all CLI commands run in your project.
   - Document any issues encountered and their resolutions.

By following these guidelines, you can effectively manage your shadcn/ui components and maintain a well-organized project structure.
