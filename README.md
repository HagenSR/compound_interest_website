## Compounding interest website

- website can be visited at https://hagensr.github.io/compound_interest_website/
- Allows for two modes - 
    - comparison - where different rates of saving can be compared
    - legs - where different rates of saving occur after each other and are shown in one graph
- website can be built with `ng build --output-path docs --base-href /compound_interest_website/`

### TODO
- allow for deleting of simulations
- deletion of legs
- revert to previous value on mode change?
- options for compounding interval
- options for when additions are made
- chart redraw on resize


## FIXED
- fix bug where values don't update on mode change, ancestor value change
- add tests
- save to csv option
