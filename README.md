# ResumeApp

A JSON-driven résumé website built with Angular. Edit your CV data without changing application code, keep several versions for different roles, and export the displayed CV to PDF using your browser.

The application currently uses Angular / Angular CLI **22.2.3**, TypeScript **6.0.3**, standalone components and zoneless change detection. It runs entirely in the browser and needs no backend or database.

## First-time setup

You do not need Angular experience to edit the CV. You need Node.js, an internet connection for the initial setup, a browser and a plain-text editor.

### 1. Install Node.js

Download and install **Node.js 24 LTS, version 24.15.0 or later within the 24.x series**, from the [official Node.js download page](https://nodejs.org/en/download). Choose the installer for your operating system. Node.js includes **npm**, the tool used to install and run this project.

Other supported Node.js versions are 22.22.3 or later within 22.x, and 26.x. These requirements are also recorded in `package.json`; see the [Angular compatibility table](https://angular.dev/reference/versions) for context.

Open a new terminal after installing:

- **Windows:** open Command Prompt from the Start menu.
- **macOS:** open the Terminal app.
- **Linux:** open your terminal application.

Type each command below and press Enter:

```sh
node --version
npm --version
```

Both should print a version number. If either command is not found, close and reopen the terminal, then check that Node.js was installed successfully.

### 2. Get the project

Download the project from [fogasjanos/resume on GitHub](https://github.com/fogasjanos/resume): choose **Code → Download ZIP**, then extract the ZIP into a folder on your computer.

Alternatively, if you already have [Git](https://git-scm.com/downloads) installed:

```sh
git clone https://github.com/fogasjanos/resume.git
cd resume
```

Open the project folder in a plain-text editor. An editor with JSON highlighting, such as Visual Studio Code, makes editing easier. Avoid Word or other word processors.

### 3. Open a terminal in the project folder

Your current folder must contain `package.json`, `package-lock.json`, `angular.json`, `src/` and `public/`.

For the ZIP download, use `cd` followed by the path to the extracted folder. For example, if you extracted it into Downloads:

**Windows Command Prompt:**

```bat
cd /d "%USERPROFILE%\Downloads\resume-main"
```

**macOS / Linux:**

```sh
cd ~/Downloads/resume-main
```

Adjust the folder name and location to match your computer. If using an editor with an integrated terminal, open the project folder first, then open its terminal.

### 4. Install the project dependencies

```sh
npm ci
```

Wait for the command to finish. It downloads the exact dependency versions recorded in `package-lock.json` and creates `node_modules/`. Run it once after downloading the project, and again after pulling changes that update dependencies. It replaces any existing dependency installation, but does not replace your CV files.

You do **not** need to install Angular CLI globally. The following commands use the version included in this project.

### 5. Start the website

```sh
npm start
```

Wait until the terminal shows the local address, normally [http://localhost:4200/](http://localhost:4200/). Open that address in your browser. You should see the example CV.

Keep the terminal open while using the website. Saved file changes normally appear automatically. To stop the server, press **Ctrl+C** in the terminal. To start it again later, return to the project folder and run `npm start`.

A production build is not needed before running the development server.

## Add your own CV

1. In your file manager or editor, copy `public/resume.json` in the same folder.
2. Rename the copy to something like `resume-java.json`. Make sure the extension is `.json`, not `.json.txt`.
3. Edit that copy and save it. Keep the original example if you want the project to remain reusable.
4. With the server running, open [http://localhost:4200/?a=java](http://localhost:4200/?a=java).

The filename controls the URL selector:

| File in `public/`  | URL                             |
| ------------------ | ------------------------------- |
| `resume.json`      | `http://localhost:4200/`        |
| `resume-java.json` | `http://localhost:4200/?a=java` |
| `resume-sql.json`  | `http://localhost:4200/?a=sql`  |

`?aspect=java` also works. If both selectors are supplied, `a` takes precedence when non-empty. Use simple suffixes containing letters, numbers, hyphens or underscores.

### JSON editing basics

JSON uses double quotes around property names and text. Separate entries with commas, but do not put a comma after the final entry. Comments are not supported. To include a double quote inside text, write `\"`.

Only `general.name` is required at the top level. Other sections are optional, but a supplied section must have the fields shown by the example and interfaces. Here is a small, valid CV you can use instead of the longer example:

```json
{
  "general": {
    "name": "Your Name",
    "headline": "Software Engineer",
    "email": { "label": "Email", "value": "you@example.com" },
    "website": { "label": "Website", "value": "https://example.com" }
  },
  "summary": "Software engineer focused on reliable services and clear communication.",
  "coreSkills": {
    "label": "Core Expertise",
    "details": [{ "label": "Backend", "description": "Java, Spring Boot, PostgreSQL" }]
  },
  "experience": {
    "label": "Professional Experience",
    "companies": [
      {
        "name": "Example Company",
        "url": "https://example.com",
        "position": "Software Engineer",
        "from": "Jan 2023",
        "to": "Present",
        "location": "Prague, Czechia",
        "highlights": ["Built and maintained backend services."],
        "technologies": "Java, Spring Boot"
      }
    ]
  }
}
```

### Supported data fields

- **`general`:** required `name`; optional `headline`, `objective`, `cell`, `email`, `github`, `linkedIn`, `website` and `city`. Contact fields use `{ "label": "…", "value": "…" }`. `city` also requires `url`.
- **`summary`:** professional summary. If empty or absent, the view falls back to `general.objective` for older data files.
- **`coreSkills`:** `{ label, details: [{ label, description }] }`. This takes the place of the older `technicalSkills` section whenever supplied; disabling `coreSkills` does not restore the old section.
- **`experience`:** `{ label, companies: [...] }`. Company entries can contain `name`, `url`, `position`, `from`, `to`, `location`, `summary`, `highlights` and `technologies`. Dates accept a year number or display string. `technologies` is a string. `highlights` is an array of strings and takes precedence over the older `description` array. Older continuation entries without a company name or position remain supported.
- **`education`:** `{ label, schools: [{ degree, school, year, faculty? }] }`. `year` is an integer; `faculty` is optional.
- **`language`:** `{ label, languages: [{ name, level }] }`.
- **`project`:** `{ label, projects: [{ name, description }] }`.
- **`training`:** `{ label, trainings: [{ name, organizer }] }`. `organizer` is a string, even when it contains a year.
- **`skills` / `hobbies`:** `{ label, values: ["…"] }`.

The runtime validator checks fields used by the view and reports the path of an invalid field. Unknown fields, including additional archive or reference data, are retained but not rendered. TypeScript interfaces are in `src/app/interfaces/`; validation is in `src/app/services/resume-validation.ts`.

Prefer plain text. Summaries and experience bullets also support basic HTML formatting, processed through Angular's built-in sanitization.

### Hide a section or exclude it from the PDF

Each optional section object supports:

- `disabled: true`: hide the section on screen and in print.
- `print: false`: show the section on screen, but hide it in print.
- `style`: optional supported Font Awesome icon identifier, such as `"fa-briefcase"`. Existing strings with extra classes remain supported; only the recognized icon identifier is used. See the `ICONS` map in `src/app/components/resume-icon/resume-icon.component.ts` for the available names. Unknown names fall back to the list icon.

For example, a training section shown only on the website:

```json
{
  "label": "Training",
  "print": false,
  "trainings": [{ "name": "Security fundamentals", "organizer": "Example Academy" }]
}
```

These options apply to section objects such as `training` or `experience`, not to `general`, the summary string or individual entries. Hidden data stays in the JSON file.

### Personal files and publishing

`resume-*.json` files are ignored by Git, so your personal variants are not included in normal commits. The default `public/resume.json` is tracked.

**Git exclusion is not access control:** everything in `public/`, including personal variants and hidden sections, is copied into the website build and can be downloaded if you publish it. Only include information intended to be public. A filename or an aspect URL does not make a CV private.

## Export to PDF

1. Open the exact CV variant you want to export and wait until it finishes loading.
2. Press **Ctrl+P** on Windows/Linux or **Cmd+P** on macOS.
3. Choose **Save as PDF**, **Microsoft Print to PDF**, or your browser's equivalent.
4. Select **A4**, portrait orientation and **100% / actual size**. Turn browser headers and footers off, and let the stylesheet's margins apply rather than adding custom ones.
5. Check the preview, then save.

The print stylesheet keeps section icons and hides contact icons and `print: false` sections. Content remains selectable text. Page count depends on your CV content, browser and print settings; two pages are not enforced.

## Build and publish the website

From the project folder:

```sh
npm run build
```

The files to upload to your static web host are the **contents of `dist/browser/`**, including `index.html`, the JavaScript bundle, `css/` and your chosen JSON files. Uploading only a JSON file is not enough for a first deployment. No Node.js server is needed on the hosting side.

Stylesheets in `public/css/` are served as separate static files. Production builds disable critical-CSS inlining because the CV is rendered in the browser after loading its JSON, and the static stylesheets are copied separately from the generated bundles. JavaScript optimization and generated CSS minification remain enabled.

The current configuration assumes hosting at the domain root (for example `https://example.com/`). A deployment under a subfolder also needs base-path and asset-path adjustments.

Make your changes in `src/` and `public/`, then rebuild; direct edits in `dist/` will be overwritten by the next build. The development server uses source files and public assets, not `dist/browser/`.

## Development and tests

| Command                                               | Purpose                                                     |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| `npm start`                                           | Start the development server.                               |
| `npm run build`                                       | Create the production website in `dist/browser/`.           |
| `npm run watch`                                       | Rebuild development output when files change.               |
| `npm test`                                            | Run Karma/Jasmine tests in a browser and watch for changes. |
| `npm test -- --watch=false --browsers=ChromeHeadless` | Run the tests once in headless Chrome.                      |
| `npm run format:check`                                | Check formatting with Prettier.                             |
| `npm run format:fix`                                  | Rewrite files to apply Prettier formatting.                 |
| `npm run knip:check`                                  | Check for unused code and dependencies.                     |

Chrome must be installed for `ChromeHeadless` tests. If it is not detected, set `CHROME_BIN` to your Chrome executable. For example, on macOS:

```sh
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm test -- --watch=false --browsers=ChromeHeadless
```

The tests cover data validation, loading/error states, aspect selection, legacy fields, section visibility, contact links, HTML sanitization and component rendering. No separate end-to-end test runner is configured.

Important project locations:

- `src/app/components/`: section components and their templates.
- `src/app/interfaces/`: CV data types and loading state.
- `src/app/services/`: JSON loading and runtime validation.
- `public/resume.json`: reusable sample data.
- `public/css/resume.css`: shared styles and responsive screen layout.
- `public/css/resume-print.css`: print-specific overrides.
- `src/app/components/resume-icon/`: decorative inline SVG icons from Font Awesome Free 7.3.1.

## Troubleshooting

| Problem                                                        | What to check                                                                                                                                                                        |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node` or `npm` is not found                                   | Install a supported Node.js version, then reopen the terminal.                                                                                                                       |
| PowerShell says `npm.ps1` cannot be loaded                     | Use Command Prompt, or run `npm.cmd` in place of `npm` in PowerShell.                                                                                                                |
| npm cannot find `package.json`                                 | Change into the project root folder before running commands.                                                                                                                         |
| `ng` is not found                                              | Use `npm start` or `npm run build`; a global Angular CLI is unnecessary.                                                                                                             |
| Port 4200 is already in use                                    | Stop the previous server with Ctrl+C, or run `npm start -- --port 4201` and open the address it prints.                                                                              |
| A CV cannot be found                                           | Check that `public/resume-java.json` exists for `?a=java`, including spelling and filename case. You can also open `/resume-java.json` in the browser to check whether it is served. |
| Invalid résumé data / invalid JSON                             | Check the field path in the error. Use double quotes, correct field types and no trailing commas.                                                                                    |
| Old Angular cache path or missing-export error after an update | Stop the server, run `npm ci`, then restart with `npm start` and hard-refresh the browser. If the error persists, stop the server, run `npm exec ng cache clean`, and restart.       |
| Changes do not appear                                          | Save the source/data file and refresh the browser. After replacing dependencies, restart the development server. For a published site, rebuild and upload the new output.            |

For Angular CLI commands not exposed above, use `npm exec ng -- <command>`. General guidance is available in the [Angular documentation](https://angular.dev/overview).

Icons use path-only inline SVGs, so no icon-font characters are introduced into PDF text extraction. They are marked as decorative and do not depend on printing background graphics. Only the mapped icons are bundled, with no Font Awesome webfonts or CSS required. Font Awesome Free icons are provided by the official npm packages; see their [license and attribution information](https://fontawesome.com/license/free).
