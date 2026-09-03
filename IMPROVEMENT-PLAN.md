# Improvement plan — @brrinta/uikit

Working through the library one component at a time. Each batch: rewrite the component (keeping the
compound `Object.assign(Root, { Part })` export style), fix its consumers, write stories that cover
**every** cva variant, and verify with `pnpm typecheck` + `pnpm storybook:build`.

## Conventions locked in (batch 1)

- **Primitives:** `@base-ui/react` for behaviour. Prefer a Base UI part over a third-party package
  when one exists (see "Migrate" below).
- **Colors via CSS variables.** A component's `color` variant only sets `--<comp>-*` variables; the
  visual variants (`solid | outline | ghost | …`) read them. Adding a color = one literal line.
  Every class must be a literal string in source (Tailwind scans text; no template strings).
- **Open state** is styled for all three signals: `data-[state=open]` (our `selected`),
  `data-popup-open` (Base UI trigger), `aria-expanded`.
- **Props:** `className` is always a `string` in wrappers; `variant="primary|secondary|destructive"`
  legacy names resolve through `resolveButtonVariants` / `buttonClassName`.
- **Stories:** `getCvaSchema(xVariants)` drives matrices so a new variant automatically appears.
- **No Storybook imports in `src/lib`** — `prepareArgTypes` is now self-typed (was leaking a
  devDependency into the published package).

## Done — batch 1

| Item | Change |
|---|---|
| tsconfig | TS 7 compatible (`baseUrl`, `esModuleInterop=false` removed; `isolatedModules`, `skipLibCheck`). |
| `lib/utils` | Removed `storybook/internal/csf` import; typed `cvaWithMeta`; `getCvaSchema` safe on non-cva input. |
| `styles/global.css` | Added the missing `--brand` token family (Button/Progress used `bg-brand` with no definition). |
| **Button** | 1068 → 445 lines. CSS-variable color system; real Base UI `Button` primitive (`nativeButton`, `focusableWhenDisabled`, keyboard handling for `render={<a/>}`); `underline` implemented (was a no-op, `underlined` kept as deprecated alias); `autoHeight`/`fullWidth` implemented; `aria-busy` + `data-loading`; `Button.Arrow` rotates when open; `Button.Group` gains `radius`; `data-variant/color/size/mode` attributes for external styling. |
| Consumers | `calendar`, `toolbar`, `select`, `pagination`, `nav-menus`, `phone-country-input` moved to `buttonClassName` / `ButtonVariantInput`. |
| Type errors | `alert`, `badge`, `dropzone` (`export type`), `toggle-group` (CSS var style), `calendar` (`table` classname, `color` prop clash). |
| **New: Slider** | Base UI Slider. Single + range, vertical, `format`/`locale`, `label`/`showValue` shortcuts, compound parts. |
| **New: Meter** | Base UI Meter. `thresholds` auto-color, custom range/format, compound parts. |
| Stories | Button (18 stories, full variant × color × appearance × size × radius × mode × state coverage), Slider (9), Meter (8). |
| Storybook | Build was red on `main` (`@storybook/blocks` removed in SB10; AppShell story imports non-existent files). Green now; AppShell story parked as `.wip` until the layout batch. |

Known, not yet fixed: `eslint` fails on TS 7 (`typescript-eslint` needs TS ≤ 6 API) — pin
`typescript@~6` for lint or wait for typescript-eslint 8.66+. `Devtools.tsx` / `tiptap-utils.ts`
import packages that are not in `package.json` (`@tanstack/*-devtools`, `@tiptap/core`) — make
them optional peers or drop the files (batch 8).

## Queue

Order is by dependency: things later batches build on come first.

### Batch 2 — form primitives
`input`, `text-input`, `textarea-input`, `label`, `field`, `fieldset`, `form-field`, `checkbox`,
`radio`, `switch`, `number-input`, `password-input`, `mask-input`, `input-otp` → **migrate to
`@base-ui/react/otp-field`** (drop `input-otp`), `file-input`, `tags-input`.
Issues seen: `field.tsx` 542 lines with duplicated label/description/error markup across
`form-field`/`text-input`; `mask-input.tsx` 1343 lines (two mask libs installed: `@react-input/mask`
and `react-imask` — keep one).

### Batch 3 — selection & pickers
`select`, `select-input`, `combobox`, `combobox-input`, `autocomplete`, `autocomplete-input`,
`command`, `calendar`, `date-input`, `date-range`, `phone-input`, `phone-country-input`.
Issues: `*-input` wrappers re-implement trigger styling — should share `buttonClassName({mode:'input'})`;
`select.tsx` compound is missing `Select.Group/GroupLabel/Separator`.

### Batch 4 — overlays
`dialog`, `alert-dialog`, `sheet`, `drawer` → **migrate to `@base-ui/react/drawer`** (drop `vaul` +
`vaul-base`), `popover`, `tooltip`, `preview-card`, `dropdown-menu`, `context-menu`,
**new: `menubar`** (`@base-ui/react/menubar`), `navigation-menu`.
Issues: `dropdown-menu`/`context-menu` duplicate ~250 lines of item styling — extract shared
`menuItemVariants`.

### Batch 5 — feedback & status
`alert`, `badge`, `progress`, `spinner`, `loading`, `skeleton`, `empty`, `sonner` → add
**`toast` on `@base-ui/react/toast`** (keep `sonner` wrapper as opt-in), `stepper`, `timeline`.

### Batch 6 — navigation & structure
`tabs` → **migrate to `@base-ui/react/tabs`** (686 lines currently hand-rolled), `accordion`,
`collapsible`, `breadcrumb`, `pagination`, `toggle-group`, `toolbar`, `separator`, `scroll-area`,
`sidebar`, `tree`, `sortable`.

### Batch 7 — display & layout primitives
`avatar`, `card`, `image`, `item`, `list`, `table`, `text`, `title`, `Anchor`, `box`, `container`,
`flex`, `group`, `stack`, `affix`, `chart` (two chart libs: `echarts` + `recharts` — pick one),
`aurora-text`, `sparkles-text`, `animated-theme-toggler`, `dropzone`.
Stories missing today for: `Anchor`, `box`, `container`, `file-input`, `flex`, `group`,
`mask-input`, `phone-country-input`, `sparkles-text`, `stack`.

### Batch 8 — composites, layout, hooks, packaging
`components/*` (DataTable, RichMdxEditor, form/*, popups/*), `layout/*` (AppShell + the missing
`Nav`/`NavUser` the story expects), `hooks/*`, `Devtools`, `tiptap-utils`.
Packaging: ship `dist` (tsup/tsdown, ESM+CJS+d.ts, `"exports"` with `./styles.css`) instead of raw
`src`; split heavy optional deps (`lexical`, `@mdxeditor/editor`, `echarts`, `recharts`,
`framer-motion` + `motion` duplicate) into subpath entries or peers so consumers don't pull 80
packages for a Button.
