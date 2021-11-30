<script>
    let yes = true
    let urlGenerator = location.origin + "Bouns-Interaction-Twitch-Tchat/visuel"
    let chaine = []
    let value = ""
    let config = {message:false,subscription:false,deleted:false,subgift:false,cheer:false,ban:false,timeout:false,dark:false,avatar:false,animSub:false,animSubGift:false,animCheer:false}

    function add()
    {
        if(value.length == 0) return

        chaine = [...chaine, value]
        console.log(chaine)
        value = ""
    }

    function remove(value)
    {
        chaine = chaine.filter(items => items != value)
        console.log(value)
    }
</script>

<main>
    <h1>Configuration</h1>

    <p>Chaine à écouter:</p>
    <input type="text" placeholder="badbounstv" bind:value={value}/>
    <button on:click={add}>add</button>

    <div class="list">
        {#each chaine as value}
            <p on:click={() => {remove(value)}}>{value}</p>
        {/each}
    </div>

    <h2>Events:</h2>
    <div>
        <div>
            <label>
                <input type=checkbox bind:checked={config.message}>
                Messages
            </label>
        </div>

        <div>
            <label>
                <input type=checkbox bind:checked={config.subscription}>
                subscription
            </label>
        </div>

        <div>
            <label>
                <input type=checkbox bind:checked={config.subgift}>
                subgift
            </label>
        </div>

        <div>
            <label>
                <input type=checkbox bind:checked={config.cheer}>
                cheer
            </label>
        </div>

        <div>
            <label>
                <input type=checkbox bind:checked={config.ban}>
                ban
            </label>
        </div>

        <div>
            <label>
                <input type=checkbox bind:checked={config.timeout}>
                Time out
            </label>
        </div>

        <div>
            <label>
                <input type=checkbox bind:checked={config.deleted}>
                deleted
            </label>
        </div>

    </div>

    <h2>Design:</h2>
    <div>
        <div>
            <label>
                <input type=checkbox bind:checked={config.dark}>
                Dark mode
            </label>
        </div>

        <div>
            <label>
                <input type=checkbox bind:checked={config.avatar}>
                Avatar
            </label>
        </div>

        {#if config.subscription}
            <div>
                <label>
                    <input type=checkbox bind:checked={config.animSub}>
                    Animation Sub
                </label>
            </div>
        {/if}

        {#if config.subgift}
            <div>
                <label>
                    <input type=checkbox bind:checked={config.animSubGift}>
                    Animation Sub Gift
                </label>
            </div>
        {/if}

        {#if config.cheer}
            <div>
                <label>
                    <input type=checkbox bind:checked={config.animCheer}>
                    Animation Cheer
                </label>
            </div>
        {/if}
    </div>

    {#if chaine.length > 0}
        <p>{urlGenerator}?chaine={chaine.join()}{config.message ? ("&message=true") : ("")}{config.subscription ? ("&subscription=true") : ("")}{config.deleted ? ("&deleted=true") : ("")}{config.subgift ? ("&subgift=true") : ("")}{config.cheer ? ("&cheer=true") : ("")}{config.ban ? ("&ban=true") : ("")}{config.timeout ? ("&timeout=true") : ("")}{config.dark ? ("&dark=true") : ("")}{config.avatar ? ("&avatar=true") : ("")}{config.animSub ? ("&animsub=true") : ("")}{config.animSubGift ? ("&animsubgift=true") : ("")}{config.animCheer ? ("&animcheer=true") : ("")}</p>
    {/if}
</main>

<style>
    div{
        /* border-bottom: 1px solid black; */
        color: #999CA0;
    }

    input {
        color: #999CA0;
        padding: 4px 6px 4px 6px;
        background: #2C2828;
        border: 0px;
        box-shadow: 0px 48px 48px -6px rgba(0, 0, 0, 0.88), 0px 0px 1px rgba(0, 0, 0, 0.72);
        border-radius: 12px;
        margin: 10px 10px 10px 0px;
    }

    button{
        color: #999CA0;
        padding: 4px 6px 4px 6px;
        background: #2C2828;
        border: 0px;
        box-shadow: 0px 48px 48px -6px rgba(0, 0, 0, 0.88), 0px 0px 1px rgba(0, 0, 0, 0.72);
        border-radius: 12px;
        margin: 10px 10px 10px 0px;
    }

    button:hover{
        background: #595454;
    }

    h1, h2, p {
        color: #999CA0;
    }

    .list{
        display: flex;
        border-bottom: 0px solid black;
    }

    .list p{
        padding: 4px 6px 4px 6px;
        background: #2C2828;

        box-shadow: 0px 48px 48px -6px rgba(0, 0, 0, 0.88), 0px 0px 1px rgba(0, 0, 0, 0.72);
        border-radius: 12px;
        margin: 10px 10px 10px 0px;
    }

    .list p:hover{
        background: #7b0000;
    }

    :global(body) {
		background-color: #1F1F1F;
        /* overflow:scroll; */
	}
</style>