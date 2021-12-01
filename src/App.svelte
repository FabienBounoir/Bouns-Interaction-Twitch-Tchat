<script>
    import { fade,scale,slide } from 'svelte/transition';
    import { onMount } from 'svelte';
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

    import bleucyan from './assets/logo/logo-bleu-cyan.png'
    import bleuyellow from './assets/logo/logo-bleu-yellow.png'
    import bleurouge from './assets/logo/logo-cyan-rouge.png'
    import orange from './assets/logo/logo-orange.png'
    import vert from './assets/logo/logo-vert.png'
    import purple from './assets/logo/logo-purple.png'
    import rainbow from './assets/logo/logo-rainbow.png'
    import red from './assets/logo/logo-red.png'
    import roseorange from './assets/logo/logo-rose-orange.png'
    import violetcyan from './assets/logo/logo-violet-cyan.png'
    import violet from './assets/logo/logo-violet.png'
    import white from './assets/logo/logo-white.png'
    import yellow from './assets/logo/logo-yellow.png'
    import bits from './assets/bits.gif'

    //get query in Url
    let query = {}

    query = location.search.split(/[?&]/g).reduce((a, pair) => {
        if (!pair.trim()) return a
        const [key, value] = pair.split("=")
        a[key] = value
        return a
    }, {})

    // @ts-ignore
    //init client connection
    const client = new tmi.Client({
        options: { debug: false },
        connection: {
            secure: true,
            reconnect: true
        },
        // @ts-ignore
        channels: query?.chaine?.split(',') || ["badbounstv"]
    });

    //connection au tchat twitch 
    client.connect();

    //component tchat 
    let image = [fete, hop, love, nice, yo, ah,]
    let actualPicture = yo
    let tchat = [];

    //frame de l'animation
    let frame;

    let timestamps = Date.now()

    //http://localhost:3000/index?chaine=lebouseuh,fruktozka,loeya,solaryfortnite,skyyart,ibai,thealvaro845,chess,pubg_battlegrounds,pubgkorea,joueur_du_grenier&subscription=true

    let confetti = []
    let timeout;

    //remplace les text par les emotes correspondante
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
                    splitText.splice(mote[0], 1, '<img class="emote" style="width: 1.5em;"  src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0" alt="'+ i +'">');
                }
            }
        }
        return splitText.join('')
    }

    if(query.message === "true" || false)
    {
        client.on('message', (channel, tags, message, self) => {
            if(tags['message-type'] == "whisper") return

            // if(message.length > 75) return

            if(tchat.length != 0)
            {
                randomAvatar()
            }

            if(tags.emotes == null)
            {
                push({message: `${message}`, username:tags.username, type: "tchat"},10000)
            }
            else
            {
                push({message: `${parseEmote(message, tags.emotes)}`, username:tags.username, type: "tchat"})
            }

            if(tchat.length == 0)
            {
                setTimeout(() => {
                    randomAvatar()
                }, 500);
            }
        });
    }

    if(query.subscription === "true" || false)
    {
        client.on("subscription", (channel, username, method, message, userstate) => {
            console.log("==============================")
            console.log(username, method)
            console.log(userstate)
            console.log("==============================")

           
            setAvatar(love)
            if(query.animsub === "true" || false)
            {
                animation([bleucyan,bleuyellow,bleurouge,orange,vert,purple,rainbow,red,roseorange,violetcyan,violet,white,yellow], 100, 10000)
            }
            push({message: `Merci pour le Sub @${username}`, name: "Sub", type: "sub"},10000)
        });

        client.on("resub", (channel, username, months, message, userstate, methods) => {
            setAvatar(fete)

            console.log("==============================")
            console.log(username, message)
            console.log(userstate)
            console.log(methods)
            console.log("==============================")

            if(query.animsub === "true" || false)
            {
                animation([bleucyan,bleuyellow,bleurouge,orange,vert,purple,rainbow,red,roseorange,violetcyan,violet,white,yellow], 100, 10000)
            }
            push({message: `Merci pour le resub @${username}`, name: `Resub ${userstate["msg-param-cumulative-months"]}eme mois`, type: "resub"}, 10000)
        });
    }

    client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
        tchat = tchat.filter((s) => (s.message != deletedMessage || s.username != username));

        if(query.deleted === "true" || false)
        {
            setAvatar(oups)
            push({message: `Attention à ton langage @${username}`, name:"Warning", type: "warning"})
        }
    });

    if(query.subgift === "true" || false)
    {
        // client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
        //     setAvatar(nice)
        //     push({message: `Merci @${username} pour le sub offert à ${recipient}`, name: "Sub Gift", type: "sub"})
        // });

        client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
            let senderCount = ~~userstate["msg-param-sender-count"];
            console.log("Sub offert aleatoire")
            console.log(userstate)
            console.log(numbOfSubs)

            setAvatar(explosion)
            if(query.animsubgift === "true" || false)
            {
                animation([bleucyan,bleuyellow,bleurouge,orange,vert,purple,rainbow,red,roseorange,violetcyan,violet,white,yellow], 100, 10000 * senderCount)
            }
            push({message: `Merci @${username} pour ${numbOfSubs > 1 ? (`les ${numbOfSubs} sub gift`) : ("le sub gift")}`, name: "Sub Gift", type: "sub"}, 1000 * senderCount > 60000 ? 60000 : (1000 * senderCount))
        });
    }

    if(query.cheer === "true" || false)
    {
        client.on("cheer", (channel, userstate, message) => {

            console.log(userstate)

            if(query.animcheer === "true" || false)
            {
                animation([bits], 100, 10000)
            }

            push({message: `Merci ${userstate["display-name"]} pour les ${userstate.bits} Bits`, name: "Bits", type: "cheers"}, 10000)
        });
    }

    client.on("clearchat", (channel) => {
        tchat = []
    });

    if(query.ban === "true" || false)
    {
        client.on("ban", (channel, username, reason, userstate) => {
            setAvatar(insulte)
            push({message: `@${username} a été ban !`, name:"Ban", type: "ban"})
        });
    }

    if(query.timeout === "true" || false)
    {
        client.on("timeout", (channel, username, reason, duration, userstate) => {
            setAvatar(agacer)
            push({message: `@${username} expulsé pour ${duration} secondes`, name:"Time Out", type: "ban"})
        });
    }

    const push = (snack, time=5000) => {      
        snack._id = v4();
        tchat = [...tchat, snack];

        if(tchat.filter((s) => s.type == "tchat").length > 8)
        {
            tchat = tchat.slice(tchat.length - 8)
        }

		setTimeout(() => {
			tchat = tchat.filter((s) => s._id !== snack._id);
		}, time + 1000);
	};

    function setAvatar(avatar){
        timestamps = Date.now()
        actualPicture = avatar
    }

    function randomAvatar(){
        if(Date.now() - timestamps > 5000)
        {
            timestamps = Date.now()
            actualPicture = image[Math.floor(Math.random() * image.length)]
        }
    }

    // push({message: `cououeeg`, username:'BadbounsTV', type: "tchat"})
    // push({message: `@BadbounsTV a été ban !`, name:"Ban", type: "ban"})
    // push({message: `@BadbounsTV expulsé pour 120 secondes`, name:"Time Out", type: "ban"})
    // push({message: `Merci pour le Sub @BadbounsTV`, name: "Sub", type: "sub"})
    // push({message: `Merci pour le resub @BadbounsTV`, name: `Resub 12eme mois`, type: "resub"})
    // push({message: `Merci @BadbounsTV pour les 12 subs gifts`, name: "Sub Gift", type: "sub"})
    // push({message: `Attention à ton langage @Leskiel`, name:"Warning", type: "warning"})    

    //create animation
    function animation(characters, nbElement, time)
    {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            cancelAnimationFrame(frame);
            confetti = []
        }, time);

        if(confetti.length != 0) return

        confetti = new Array(nbElement).fill()
        .map((_, i) => {
            return {
                character: characters[i % characters.length],
                x: Math.random() * 100,
                y: -40 - Math.random() * 100,
                r: 0.1 + Math.random() * 1
            };
        })
        .sort((a, b) => a.r - b.r);

        function loop() {
            frame = requestAnimationFrame(loop);
            confetti = confetti.map(emoji => {
                emoji.y += 0.3 * emoji.r;
                if (emoji.y > 120) emoji.y = -40;
                return emoji;
            });
        }

        loop();
    }

</script>

<main>
    <div id="saver">
        {#each confetti as c}
            <img class="animationAvatar" style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})" src={c.character} alt=" "/>
        {/each}
        <div class="gridApp {query.left === "true" ? 'gridLeft' : 'gridRight'}">
            <div class="textfields" >
                <ul class="{query.left === "true" ? 'alignLeft' : 'alignRight'}">
                    {#each tchat as message (message._id)}
                    <li class="{query.dark === "true" ? 'dark' : 'white'}" in:scale="{{ delay: tchat.length ? (380) : (0), duration: tchat.length > 3 ? (tchat.length > 6 ? (tchat.length > 9 ? (0) : (100)) : (250)) : (500) }}" out:slide>
                        {#if message.type == "tchat"}
                            <p in:fade="{{ duration: tchat.length > 3 ? (tchat.length > 6 ? (tchat.length > 9 ? (0) : (50)) : (100)) : (200) }}"><b>{message.username}:&nbsp;</b>{@html message.message} </p>
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
                        {#if message.type == "cheers"}
                            <div in:fade="{{ duration: 200 }}" class="Embed">
                                <div class="top cheers">{message.name}</div>
                                <div class="bottom">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        {/if}
                    </li>
                    {/each}
                </ul>
            </div>
            <div class="avatar {query.avatar === "true" ? '' : 'none'}">
                {#if tchat.length}
                    <img in:scale="{{ duration: 400 }}" out:scale="{{ delay:500, duration: 1000 }}" src={actualPicture} alt=" "/>
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

    :global(body) {
		overflow: hidden;
        overflow-x: hidden;
	}

    .animationAvatar {
        position: absolute;
		user-select: none;
    }

    div#saver {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background-image: url("../assets/background.png"); */
        background-size: cover;
    }

    div#saver img.animationAvatar{
        width: 5em;
    }

    .gridApp{
        display: grid;
        grid-template-areas: "text avatar";
        /* grid-template-columns: 1fr 0.1fr; */
        position: absolute;
    }

    .gridRight {
        grid-template-areas: "text avatar";
        right: 0;
        bottom: 0;
    }

    .gridLeft {
        grid-template-areas: "avatar text";
        left: 0;
        bottom: 0;
    }

    .textfields {
        /* padding: 3em 3em 0em 3em;
        margin: -3em -4em 0em -3em; */

        overflow: hidden; 
        overflow-y: auto; 
        grid-area: text;
    }

    .avatar {
        place-self: flex-end;
        grid-area: avatar;
    }

    .none{
        display: none;
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


    /* type de message color */
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

    .cheers{
        background: rgba(175, 77, 253, 0.7);
    }

    .alignRight{
        text-align: -webkit-right;
    }

    .alignLeft{
        text-align: -webkit-left;
    }

    li{
        list-style-type: none;

        backdrop-filter: blur( 6px );
        -webkit-backdrop-filter: blur( 6px );
        margin: 10px;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 23px;

        width: max-content;
        max-width: 25em;

        text-align: right;

        transform-origin: bottom right;

        border-radius: 10px;
    } 

    .white {
        color: #fff;
        border: 1px solid rgba( 255, 255, 255, 0.30 );
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 12px 0 rgba( 31, 38, 135, 0.37 );
        text-shadow: 0 2px 4px rgb(71 97 206 / 36%);
    }

    .dark {
        color: #101010;
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 8px 12px 0 rgba( 31, 38, 135, 0.37 );
        text-shadow: 0 2px 4px rgb(150 155 176 / 36%);
        background: rgb(44, 40, 40, 0.25);
    }

    li p{
        margin: 10px 20px 10px 20px;
        font-weight: 300;
        align-items: center;
        display: flex;
    }

    b {
        margin-bottom: auto;
    }

    li p p:first-child{
        margin: 10px 20px 10px 20px;
        font-weight: 300;
        align-items: center;
        display: flex;
        font-weight: bold;
    }

    .emote{
        width: 1.5em;
    }

</style>
