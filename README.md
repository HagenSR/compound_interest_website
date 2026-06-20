## Compounding interest website

- website can be visited at https://hagensr.github.io/compound_interest_website/
- Allows for two modes - 
    - comparison - where different rates of saving can be compared
    - legs - where different rates of saving occur after each other and are shown in one graph
- website can be built with `ng build --output-path docs --base-href /compound_interest_website/`

### Deployment (hagensr.com/compound_interest_website)

1. Build with the correct base href:
   ```
   ng build --base-href /compound_interest_website/
   ```

2. Remove the old files on the server:
   ```
   rm -rf /path/on/server/compound_interest_website/browser
   ```

3. Copy the new build to the server:
   ```
   scp -r dist/compound_interest_website/browser antarctic9115@140.186.100.129:/path/on/server/compound_interest_website/
   ```

4. Fix permissions if needed:
   ```
sudo chmod -R 755 .
   ```

The Caddyfile is at the project root. Update the `root *` path to the absolute path on the server before use.

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
