---
allowed-tools: Bash(gh pr:*), Bash(gh diff:*), Bash(git:*), Read, Edit
description: Update changelog and version from current PR
---

# Update Changelog from PR

Update the changelog and version for sajn-app based on the current PR.

## Step 1: Gather Information

Run these commands:

1. Get PR details:
   ```bash
   gh pr view --json title,body,number,headRefName,commits
   ```

2. Get the full PR diff:
   ```bash
   gh pr diff
   ```

3. Read the current changelog for style reference:
   - Read `lib/utils/changelog.ts`

4. Read package.json for current version:
   - Read `package.json` (just the version field)

## Step 2: Analyze & Consolidate

Look at ALL changes and distill them into **3-5 user-facing bullet points**.

**Consolidation rules:**
- Multiple related changes = ONE bullet point
- Technical refactoring with no user impact = skip entirely
- Backend changes users don't see = skip entirely
- Ok to add "Smashed some bugs" and "security improvements"

## Step 3: Generate Entry

```typescript
{
    version: "X.XX.XXX",  // Increment patch number
    date: "DD månad YYYY",  // Swedish: januari, februari, mars, april, maj, juni, juli, augusti, september, oktober, november, december
    title: "Kort titel",  // 2-4 words, catchy
    description: "En mening som sammanfattar vad som är nytt.",
    items: [
        // 3-5 bullet points MAX
        // Write what users CAN DO, not what changed
    ],
},
```

**ONLY add `sections` for major releases (10+ distinct changes).** Most PRs should just use `items`.

## Step 4: Version Increment

- Read current version from package.json (e.g., "0.50.295")
- Increment PATCH: "0.50.295" → "0.50.296"

## Step 5: Edit Files

1. **Edit `lib/utils/changelog.ts`** - Add entry as FIRST item in array
2. **Edit `package.json`** - Update version field

## Writing Rules

**DO:**
- Write in Swedish
- Focus on what users gain ("Nu kan du...", "Förbättrad...")
- Keep it short and scannable
- Consolidate related changes

**DON'T:**
- List the same thing twice
- Mention technical details (components, APIs, refactoring)
- Include changes users won't notice
- Use more than 5 bullet points for normal releases
- Commit changes

## Example

```typescript
{
    version: "0.50.296",
    date: "16 december 2025",
    title: "Bättre organisationshantering",
    description: "Enklare att hantera din organisation och dess medlemmar.",
    items: [
        "Ny profilsida för organisationer",
        "Enklare att bjuda in och hantera medlemmar",
        "Förbättrad navigering i inställningar",
    ],
},
```

Note: Do NOT commit - just edit the files.
