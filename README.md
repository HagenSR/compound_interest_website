## Compounding interest website

- website can be visited at https://hagensr.github.io/compound_interest_website/
- Allows for two modes - 
    - comparison - where different rates of saving can be compared
    - legs - where different rates of saving occur after each other and are shown in one graph
- website can be built with `ng build --output-path docs --base-href /compound_interest_website/`

### TODO
- fix bug where values don't update on mode change, ancestor value change
- allow for deleting of simulations
- revert to previous value on mode change?
- options for compounding interval
- chart redraw on resize
- add tests