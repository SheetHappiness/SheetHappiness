# softsock Hypercomputer v0.1

A finite-state Markdown computer. It uses **two 2-bit unsigned registers** A and B (values 0 to 3), five commands, and **16 generated states**. Every click follows a relative Markdown link to the next state.

**[Boot computer → A=1, B=2](./states/a1-b2.md)**

## Instructions

| Command | Semantics |
| :-- | :-- |
| `INC A` | Increment A (modulo 4) |
| `DEC B` | Decrement B (modulo 4) |
| `ADD` | A = (A + B) modulo 4 |
| `SWAP` | Exchange A and B |
| `RESET` | Set both registers to zero |

`ADD` stores the sum in A and leaves B unchanged; arithmetic wraps modulo 4. `RESET` sets A and B to zero.

## Implementation

The deterministic compiler is [`scripts/hypercomputer.mjs`](../scripts/hypercomputer.mjs). It enumerates every state, renders 16 Markdown pages and 16 SVG screens, and verifies reachability and link targets with [tests](../tests/hypercomputer.test.mjs). GitHub Actions rebuilds the generated outputs when sources change.

Unlike an executable computer, **there is no computation while browsing**: each page has been generated ahead of time.

[← Return to GitHub profile](../README.md#hypercomputer)
