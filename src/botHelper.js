export function getLiqBots() {
    return fetch('https://liqbot-testnet.ops.vega.xyz/traders-settlement')
        .then(response => response.json())
}

export function liqBots() {

    fetch("https://liqbot-testnet.ops.vega.xyz/traders-settlement", {
            method: 'GET',
            mode: 'no-cors',
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.items
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error)
            });
}