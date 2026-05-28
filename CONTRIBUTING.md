# Contributing to TechTonic Website V2.0

Thank you for contributing to TechTonic.  
This project follows strict engineering standards to remain scalable, maintainable, and onboarding-friendly over the long term.

## Read Before You Start

- Architecture rules: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- Code standards: [`CODE_STYLE.md`](./CODE_STYLE.md)
- Project layout: [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md)
- Setup and workflow: [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md)
- Design direction: [`DESIGN.md`](./DESIGN.md)

## Contribution Workflow

1. Sync your base branch.
2. Create a branch with the naming convention below.
3. Implement one focused change set.
4. Run local checks (`lint`, `build`, and required tests).
5. Open a PR with the required template fields.
6. Address review comments and keep history clean.

## Branch Naming Convention

Use one prefix:

- `feature/<scope>-<description>`
- `refactor/<scope>-<description>`
- `bugfix/<scope>-<description>`
- `chore/<scope>-<description>`

Examples:

- `feature/recruitment-form-validation`
- `refactor/home-section-splitting`
- `bugfix/header-scroll-throttle`
- `chore/docs-cross-link-cleanup`

## Commit Messages (Conventional Commits)

Format:

```text
<type>(<scope>): <subject>
```

Types:

- `feat`, `fix`, `refactor`, `docs`, `test`, `perf`, `chore`, `build`, `ci`

Examples:

- `feat(events): add featured timeline block`
- `refactor(3d): extract canvas performance guards`
- `fix(contact): normalize external link rel attributes`

## Pull Request Process

### PR Must Include

- Problem context and objective.
- What changed and why.
- Screenshot or video for UI/3D changes.
- Risks and rollback notes (if any).
- Verification steps and test evidence.

### PR Checklist

- [ ] Branch name follows convention.
- [ ] Follows [`CODE_STYLE.md`](./CODE_STYLE.md).
- [ ] Respects layer boundaries in [`ARCHITECTURE.md`](./ARCHITECTURE.md).
- [ ] No circular dependencies introduced.
- [ ] Local checks pass.
- [ ] Tests added/updated for changed behavior.
- [ ] Docs updated when structure/rules change.

## Code Review Guidelines

Reviewers prioritize:

1. Correctness and regression risk.
2. Architecture and dependency boundaries.
3. Readability and maintainability.
4. Type safety and error handling.
5. Performance implications, especially animation/3D.

Author responsibilities:

- Reply to all substantial comments.
- Keep PR scope focused.
- Prefer follow-up commits over hidden large force-rewrites during review.

## Scope and PR Size Policy

- Preferred: small to medium PRs with one main concern.
- Avoid mixing unrelated refactors and feature logic.
- Split large work into sequential PRs.

## Security and Quality Expectations

- External links opening in new tabs must use `rel="noopener noreferrer"`.
- Do not bypass lint/type safety in the final PR.
- Never commit secrets or environment credentials.

## Communication

- Keep discussion technical, explicit, and actionable.
- Record architecture-impacting decisions in PR notes and docs.
