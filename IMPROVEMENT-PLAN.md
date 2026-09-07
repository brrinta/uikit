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

## Done — TanStack Table v9

`@tanstack/react-table@9` (stable since Aug 2026) added as a proper dependency — it was previously
imported but missing from `package.json`. DataTable migrated: `useReactTable` → `useTable`,
explicit `dataTableFeatures = tableFeatures({ rowSelectionFeature, rowPaginationFeature,
columnVisibilityFeature })` (server-driven table, so no client sort/filter code in the bundle),
`enableRowRangeSelection: false` to keep v8 checkbox behaviour, `TFeatures` generic threaded through
`DatatableColumnDefinition` / `useCreateColumns` / props, and `createDataTableColumnHelper<TData>()`
exported for typed consumer columns. Note v9 is ESM-only. Opt-in follow-ups for the DataTable batch:
`table.Subscribe`/atoms for pagination footer renders, `table.FlexRender`.

## Done — batch 2a (selection controls + OTP)

| Item | Change |
|---|---|
| **Checkbox** | **Bug fix:** checked/indeterminate styles used Radix's `data-[state=checked]`, which Base UI never emits — checked color/background silently never applied. Now on `data-checked`/`data-indeterminate` with the CSS-var pattern (`--cb`/`--cb-fg`), full 26-color set, indeterminate gets a minus icon, single render path for label/no-label, `data-size`/`data-color` attributes. |
| **RadioGroup** | **Bug fix:** the indicator dot hardcoded `text-primary`, so the `color` variant never affected it — now `text-current`. Added `size` (sm/md/lg) and `orientation` variants, full color set, `data-checked:border-current`, deduped markup. |
| **Switch** | Colors moved to `--sw` CSS-var pattern (11 → 25 colors, one literal line each); removed a manual `data-checked` attribute that desynced from uncontrolled toggling; `permanent` on-label now follows the switch color. |
| **InputOTP** | Migrated `input-otp` package → `@base-ui/react/otp-field` (dependency dropped). New shorthand (`length`, `groupSize`, `size`), `mask`, `validationType`, `autoSubmit`, controlled value. Back-compat: `maxLength` alias, `InputOTP.Slot` aliases `InputOTP.Input`. |
| Stories | Checkbox (8), RadioGroup (8), Switch (8), InputOTP (12) — full variant matrices driven by `getCvaSchema`; new FileInput stories (5, previously none). |
| Tooling | `tsconfig.storybook.json` fixed for TS 7 (`emitDecoratorMetadata` without decorators). This surfaced latent story type errors in Avatar.stories (compound component used directly as `render`) — queued for batch 7. |

## Done — batch 2b (mask consolidation)

| Item | Change |
|---|---|
| **Mask dependencies dropped** | `react-imask` was imported nowhere (dead dep) and `@react-input/mask` had only two call sites — both now run on the library's own mask engine. Zero external mask deps remain. |
| **`useMaskedInput`** | New ref-based hook in `mask-input.tsx` on the same engine as `<MaskInput>`: re-masks in place on the input event (before React handlers), with caret preservation via the existing `fromUnmaskedIndex` helpers. Drop-in for form-driven inputs; supports dynamic patterns. |
| **PhoneInput** | `useMask` → `useMaskedInput` (public `_`-slot mask converted to internal `#`). The show-mask-while-empty trick replaced by using the mask as placeholder. |
| **CreditCardInput** | Three `useMask` refs (dynamic card pattern, expiry, CVC) → `useMaskedInput`; TanStack Form wiring untouched. |
| Stories | New MaskInput stories (9): every built-in pattern, currency locales, custom `MaskPattern`, validation modes, controlled masked+unmasked, and the ref hook. |
| Audited, deliberately unchanged | `field.tsx` context-driven part system is sound; the thin `text/textarea/password/number-input` wrappers correctly delegate to `FormField`. Runtime caveat: the new hook changes masking behaviour at the edges (mid-string deletion caret, paste) — worth a manual pass in the storybook before release. |


## Queue

Order is by dependency: things later batches build on come first.

### Batch 2 — form primitives
`input`, `text-input`, `textarea-input`, `label`, `field`, `fieldset`, `form-field`, `checkbox`,
`radio`, `switch`, `number-input`, `password-input`, `mask-input`, `input-otp` → **migrate to
`@base-ui/react/otp-field`** (drop `input-otp`), `file-input`, `tags-input`.
Issues seen: `field.tsx` 542 lines with duplicated label/description/error markup across
`form-field`/`text-input`; `mask-input.tsx` 1343 lines (two mask libs installed: `@react-input/mask`
and `react-imask` — keep one).

### ~~Batch 3~~ Done — selection & pickers (batch 3a)
| Item | Change |
|---|---|
| **New `src/ui/listbox.ts`** | Shared cvas (`listboxItemVariants` with `base-ui`/`cmdk` highlight modes, group, group-label, separator, scroll-button, empty, list) — Select/Combobox/Autocomplete/Command previously carried three diverging copies of the same classes. |
| **Select keyboard highlight fixed** | `Select.Item` only styled `:focus`; Base UI marks the active item with `data-highlighted`, so keyboard navigation showed no highlight. Shared item variants style both. |
| **Command class-string bug fixed** | A stray quote inside `CommandItem`'s template literal produced the invalid class `[&_svg]:shrink-0'`, disabling that rule. |
| **Autocomplete.ActionWrapper added** | `Autocomplete.stories` used `Autocomplete.ActionWrapper`, which didn't exist — the story page crashed at runtime. Implemented as an end-aligned action area in `Control` and attached to the compound. |
| Stories | New PhoneCountryInput stories (7, previously none): countries, international mode, controlled E.164 with validity, invalid, disabled. |
| Corrected stale note | `select.tsx` already had Group/GroupLabel/Separator and uses `buttonClassName` since batch 1. |

### Done — batch 3b (dates & calendar)

| Item | Change |
|---|---|
| **Timezone bug fixed in date-range** | All six date-only serializations used `toISOString().split('T')[0]`, which converts to UTC first — east of UTC (e.g. Dhaka), selecting Sep 7 emitted `"2026-09-06"`. Now `format(d, 'yyyy-MM-dd')` (local). The single datetime serialization at the end correctly stays a full ISO instant. |
| **DateTimeInput demo data removed** | A hardcoded 30-entry `timeSlots` array with fake availability shipped in the library. Now a `timeSlots?: DateTimeSlot[]` prop with a generated all-available default (09:00–23:30, 30-min step). |
| **Calendar `color` prop** | Selected-day/range colors via `--cal`/`--cal-fg` CSS vars (20 colors, one literal line each), consistent with Button/Checkbox/Switch. DayButton reads the vars instead of hardcoded primary. |
| Stories | Calendar `Colors` + `RangeWithColor` added. |
| Audited, deliberately unchanged | `select-input`/`combobox-input`/`autocomplete-input` are dense but coherent FormField wrappers; rewriting them without visual regression tests is worse than leaving them. `date-input` is a thin, correct wrapper. |

### Batch 4 — overlays (4a done)
Done in 4a:

| Item | Change |
|---|---|
| **Dialog animations fixed** | `dialogContentVariants` and the close button styled Radix's `data-[state=open/closed]` — Base UI emits `data-open`/`data-closed`, so open/close animations never ran. Same class of bug as Checkbox (2a) and Select highlight (3a). |
| **Collapsible animation fixed** | Panel referenced `animate-collapsible-up/down` keyframes that don't exist anywhere, on the wrong data attribute — replaced with Base UI's `--collapsible-panel-height` transition pattern. |
| **filters.tsx open state** | Popover triggers styled `data-[state=open]` (dead on Base UI); `data-popup-open:` added alongside. |
| **New `src/ui/menu-shared.ts`** | `menuItemVariants` (default/destructive), `menuSubTriggerVariants` (all three open signals), `menuCheckableItemVariants`, `menuContentVariants` (surface + enter/exit animation), indicator/shortcut constants. dropdown-menu and context-menu refactored onto them (~250 duplicated lines removed); `data-highlighted` styling gained everywhere; per-component extras (`h-10 cursor-pointer`, group names) stay at call sites. |
| **New: Menubar** | `@base-ui/react/menubar` container reusing the whole DropdownMenu part set (`Menubar.Menu/Trigger/Content/Item/CheckboxItem/RadioGroup/Sub/Shortcut/…`), compact trigger styling. Exported from index; 2 stories (full app menubar with submenu/checkbox/radio, disabled states). |

Done in 4b:

| Item | Change |
|---|---|
| **Drawer migrated to `@base-ui/react/drawer`** | `vaul` + `vaul-base` dependencies dropped. Public API kept (`direction="bottom|top|left|right"` maps to Base UI `swipeDirection`; positioning via our `data-drawer-direction`). Gains from the primitive: snap points (`snapPoints`/`defaultSnapPoint`), nested drawers, swipe-aware transitions (`data-swiping:transition-none`). New Viewport→Popup→Content structure with a scrollable content region. |
| **Drawer className bug fixed** | Old `DrawerContent` had the word `className` *inside* its class template instead of passing the prop — consumer classes on DrawerContent were silently discarded (and a literal `className` class emitted). |
| Stories | SnapPoints story added. |
| Audit | `sheet`/`alert-dialog`/`popover`/`preview-card` clean. **Tooltip** carried dead Radix `data-[state=delayed-open]` classes (removed). **NavigationMenu** styled Radix `data-[motion=…]` (Content directional slide — never ran) and `data-[state=visible|hidden]` (indicator) — replaced with Base UI `data-[activation-direction]` + starting/ending-style transitions and `data-open`/`data-closed`. |

Base UI `toast` moves to batch 5 (feedback batch owns it alongside the sonner wrapper).

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
