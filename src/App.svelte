<script>
    import { fade,scale,slide } from 'svelte/transition';
    import { v4 } from 'uuid';

    import agacer from './assets/animation/agacer.png'
    import fete from './assets/animation/fete.png'
    import grrr from './assets/animation/grrr.png'
    import hop from './assets/animation/hop.png'
    import love from './assets/animation/love.png'
    import nice from './assets/animation/nice.png'
    import yo from './assets/animation/yo.png'
    import ah from './assets/animation/ah.png'
    import explosion from './assets/animation/explosion.png'
    import insulte from './assets/animation/insulte.png'
    import non from './assets/animation/non.png'
    import oups from './assets/animation/oups.png'

    let query = location.search.split(/[?&]/g).reduce((a, pair) => {
        if (!pair.trim()) return a
        const [key, value] = pair.split("=")
        a[key] = value
        return a
    }, {})

    const client = new tmi.Client({
        options: { debug: false },
        connection: {
            secure: true,
            reconnect: true
        },
        channels: query?.chaine?.split(',') || ["badbounstv"]
    });

    client.connect();

    let image = [fete, grrr, hop, love, nice, yo, ah,]

    let actualPicture = ""

    let tchat = [];

    function parseEmote(text, emotes)
    {
        var splitText = text.split('');
        for(var i in emotes) {
            var e = emotes[i];
            for(var j in e) {
                var mote = e[j];
                if(typeof mote == 'string') {
                    mote = mote.split('-');
                    mote = [parseInt(mote[0]), parseInt(mote[1])];
                    var length =  mote[1] - mote[0],
                        empty = Array.apply(null, new Array(length + 1)).map(function() { return '' });
                    splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
                    splitText.splice(mote[0], 1, '<img class="emote" style="width: 1.5em;"  src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0">');
                }
            }
        }
        return splitText.join('')
    }

    if(query.message === "true" || false)
    {
        client.on('message', (channel, tags, message, self) => {
            if(tags['message-type'] == "whisper") return

            randomAvatar()

            if(tags.emotes == null)
            {
                push({message: `${message}`, type: "tchat"})
            }
            else
            {
                console.log(parseEmote(message, tags.emotes))
                push({message: `${parseEmote(message, tags.emotes)}`, type: "tchat"})
            }
        });
    }

    client.on("subscription", (channel, username, method, message, userstate) => {
        setAvatar(love)
        push({message: `Merci pour le Sub @${username}`, name: "Sub", type: "sub"})
    });

    client.on("resub", (channel, username, months, message, userstate, methods) => {
        setAvatar(fete)

        console.log(months)
        console.log(userstate)
        push({message: `Merci pour le resub @${username}`, name: `Resub ${userstate["msg-param-cumulative-months"]}eme mois`, type: "resub"})
    });

    client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
        setAvatar(oups)

        push({message: `Attention à ton langage @${username}`, name:"Warning", type: "warning"})
    });

    client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
        let senderCount = ~~userstate["msg-param-sender-count"];
        console.log(userstate)
        console.log(streakMonths)
        console.log(recipient)
        console.log(methods)
        console.log("sub offert")

        setAvatar(nice)
        push({message: `Merci @${username} pour les ${senderCount} sub gift`, name: "Sub Gift", type: "sub"})
    });

    client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
        let senderCount = ~~userstate["msg-param-sender-count"];
        console.log("Sub offert aleatoire")

        setAvatar(explosion)
        push({message: `Merci @${username} pour les ${senderCount} sub gift`, name: "Sub Gift", type: "sub"})
    });

    client.on("ban", (channel, username, reason, userstate) => {
        setAvatar(insulte)
        push({message: `@${username} a été ban !`, name:"Ban", type: "ban"})
    });

    client.on("timeout", (channel, username, reason, duration, userstate) => {
        setAvatar(agacer)
        push({message: `@${username} expulsé pour ${duration} secondes`, name:"Time Out", type: "ban"})
    });

    const push = (snack) => {      
        snack._id = v4();
        tchat = [...tchat, snack];

		setTimeout(() => {
			tchat = tchat.filter((s) => s._id !== snack._id);
		}, 8000);
	};

    function setAvatar(avatar){
        actualPicture = avatar
    }

    function randomAvatar(){
        actualPicture = image[Math.floor(Math.random() * image.length)]
    }

    // push({message: `cououeeg`, type: "tchat"})
    // push({message: `@BadbounsTV a été ban !`, name:"Ban", type: "ban"})
    // push({message: `@BadbounsTV expulsé pour 120 secondes`, name:"Time Out", type: "ban"})
    // push({message: `Merci pour le Sub @BadbounsTV`, name: "Sub", type: "sub"})
    // push({message: `Merci pour le resub @BadbounsTV`, name: `Resub 12eme mois`, type: "resub"})
    // push({message: `Merci @BadbounsTV pour les 12 subs gifts`, name: "Sub Gift", type: "sub"})
    // push({message: `Attention à ton langage @Leskiel`, name:"Warning", type: "warning"})
</script>

<main>
    <div id="saver">
        <div class="gridApp">
            <div class="textfields" >
                <ul>
                    {#each tchat as message (message._id)}
                    <li in:scale="{{ delay:300, duration: 500 }}" out:slide>
                        {#if message.type == "tchat"}
                            <p in:fade="{{ duration: 200 }}">{@html message.message}</p>
                        {/if}
                        {#if message.type == "ban"}
                            <div in:fade="{{ duration: 200 }}" class="Embed">
                                <div class="top ban">{message.name}</div>
                                <div class="bottom">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        {/if}
                        {#if message.type == "warning"}
                            <div in:fade="{{ duration: 200 }}" class="Embed">
                                <div class="top warning">{message.name}</div>
                                <div class="bottom">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        {/if}
                        {#if message.type == "resub"}
                            <div in:fade="{{ duration: 200 }}" class="Embed">
                                <div class="top resub">{message.name}</div>
                                <div class="bottom">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        {/if}
                        {#if message.type == "sub"}
                            <div in:fade="{{ duration: 200 }}" class="Embed">
                                <div class="top sub">{message.name}</div>
                                <div class="bottom">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        {/if}
                    </li>
                    {/each}
                </ul>
            </div>
            <div class="avatar">
                {#if tchat.length}
                    <img in:scale="{{ duration: 250 }}" out:scale="{{ delay:500, duration: 1000 }}" src={actualPicture} alt=" "/>
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    *,
    *::after,
    *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    } 

    div#saver {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
    /* background-image: url("./assets/background.png"); */
    background-size: cover;
}

    .gridApp{
        display: grid;
        /* grid-template-areas: "text avatar"; */
        grid-template-columns: 1fr 0.1fr;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .textfields {
        padding: 3em 3em 0em 3em;
        margin: -3em -4em 0em -3em;

        overflow: hidden; 
        overflow-y: auto; 
    }

    .avatar {
        place-self: flex-end;
    }

    .avatar img{
        border-radius: 100px;
        width: 10em;
    }

    .Embed{
        display: grid;
        grid-template-areas:    "Top"
                                "Bottom";
    }

    .top{
        grid-area: Top;
        padding: 10px 20px 10px 20px; 
        border-radius: 10px 10px 0px 0px;
        text-align: left;
        font-weight:bold;
        letter-spacing: 1px;
    }

    .bottom{
        grid-area: Bottom;
    }

    .ban{
        background: rgba(195, 40, 40, 0.7);
    }

    .resub{
        background: rgba(37, 149, 200, 0.801);
    }
    
    .sub{
        background: rgba(43, 170, 229, 0.70);
    }

    .warning{
        background: rgba(206, 142, 41, 0.7);
    }

    ul{
        text-align: -webkit-right;
    }

    li{
        list-style-type: none;
        /* padding: 10px 20px 10px 20px; */
        /* border: solid 2px red; */
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        /* box-shadow: 0 0.5em 1em -0.25em rgba(black, 0.15); */
        backdrop-filter: blur( 6px );
        -webkit-backdrop-filter: blur( 6px );
        margin: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.30 );

        text-shadow: 0 2px 4px rgb(71 97 206 / 36%);
        color: #fff;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 23px;
        /* letter-spacing: -.9px; */

        /* animation: disparition 20s both; */
        width: max-content;

        text-align: right;

        transform-origin: bottom right;

        border-radius: 10px;
    } 

    li p{
        margin: 10px 20px 10px 20px;
        font-weight: 300;
        align-items: center;
        display: flex;
    }

    .emote{
        width: 1.5em;
    }

    @keyframes disparition {
    0% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none;
    }
}

</style>
