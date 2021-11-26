<script>
    import logo from './assets/svelte.png'
    import video from './assets/animation.png'
    import { fade, fly } from 'svelte/transition';

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

    let timeOut

    const client = new tmi.Client({
        options: { debug: false },
        connection: {
            secure: true,
            reconnect: true
        },
        channels: ["squeezie","rebeudeter","skyrroz", "kamet0", "hasanabi"]
    });

    client.connect();

    import transparent from './assets/animation/transparent.png'

    let image = [agacer, fete, grrr, hop, love, nice, yo, ah, non, oups, insulte, explosion]

    let actualPicture = transparent

    const typewriter = (node, { speed = 50 }) => {
        const valid =
            node.childNodes.length === 1 && node.childNodes[0].nodeType === 3;
        if (!valid) {
            return;
        }
        const text = node.textContent;
        const duration = text.length * speed;
        return {
            duration,
            tick: t => {
                const i = Math.ceil(text.length * t);
                node.textContent = text.slice(0, i);
            }
        };  
    };

    // let tchat = [{name: `coucou`}, {name: `coucouergeringi rengierb b`}, {name: `coucouergergre herh e erh er hhe`}];
    let tchat = [];

    if(false)
    {
        client.on('message', (channel, tags, message, self) => {
            if(tags['message-type'] == "whisper") return
    
            clearTimeOut()

            tchat = [...tchat.slice(), {message: `${message}`, type: "tchat"}]
    
            actualPicture = image[Math.floor(Math.random() * image.length)]
    
            clearAvatar()
        });
    }

    client.on("subscription", (channel, username, method, message, userstate) => {
        // console.log(username)
        // console.log(method)
        // console.log(message)
        // console.log(userstate)

        setAvatar(love)

        tchat = [...tchat.slice(), {message: `Merci pour le Sub @${username}`, name: "Sub", type: "sub"}]

        clearAvatar()
    });

    client.on("resub", (channel, username, months, message, userstate, methods) => {
        // console.log(username)
        // console.log(months)
        // console.log(message)
        // console.log(userstate)
        // console.log(methods)

        setAvatar(fete)

        tchat = [...tchat.slice(), {message: `Merci pour le resub @${username}`, name: "Resub", type: "resub"}]

        clearAvatar()
    });

    client.on("messagedeleted", (channel, username, deletedMessage, userstate) => {
        setAvatar(oups)

        tchat = [...tchat.slice(), {message: `Attention a ton language @${username}`, name:"Warning", type: "warning"}]

        clearAvatar()
    });

    client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
        let senderCount = ~~userstate["msg-param-sender-count"];
        
        console.log(userstate)
        console.log(streakMonths)
        console.log(recipient)
        console.log(methods)

        setAvatar(explosion)

        tchat = [...tchat.slice(), {message: `Merci @${username} pour les ${senderCount} sub gift`, name: "Sub Gift", type: "sub"}]

        clearAvatar()
    });

    client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
        let senderCount = ~~userstate["msg-param-sender-count"];

        setAvatar(nice)

        tchat = [...tchat.slice(), {message: `Merci @${username} pour les ${senderCount} sub gift`, name: "Sub Gift Mysterieux", type: "sub"}]

        clearAvatar()
    });

    client.on("ban", (channel, username, reason, userstate) => {

        setAvatar(insulte)

        tchat = [...tchat.slice(), {message: `@${username} a été ban !`, name:"Ban", type: "ban"}]

        clearAvatar()
    });

    client.on("timeout", (channel, username, reason, duration, userstate) => {
        
        setAvatar(agacer)

        tchat = [...tchat.slice(), {message: `@${username} est Time out pendant ${duration} secondes`, name:"Time Out", type: "ban"}]

        clearAvatar()
    });

    function clearTimeOut(){
        clearTimeout(timeOut)
    }

    function setAvatar(avatar){
        clearTimeOut()
        actualPicture = avatar
    }

    function randomAvatar(){
        clearTimeOut()
        actualPicture = image[Math.floor(Math.random() * image.length)]
    }

    function clearAvatar(){
        timeOut = setTimeout(() => {
                actualPicture = transparent
        }, 19000);
    }

    // function textAnimation(){
    //     let random = Math.floor(Math.random() * 10000)
    //     tchat = [...tchat.slice(), {name: `coucou ${Math.random()}`}]

    //     setTimeout(() => {
    //         textAnimation()
    //     }, random);
    // }
</script>

<main>
    <!-- <img src={logo} alt="Svelte Logo" />
    <h1>Hello world!</h1> -->

    <!-- <Counter /> -->
    <div id="saver">
        <div class="gridApp">
            <div class="textfields" >
                <ul>
                    {#each tchat as message}
                    <li>
                        {#if message.type == "tchat"}
                            <p in:typewriter>{message.message}</p>
                        {/if}
                        {#if message.type == "ban"}
                            <!-- <p in:fade>{message.name}</p> -->
                            <div class="Embed">
                                <div class="top ban">{message.name}</div>
                                <div class="bottom">
                                    <p in:fade>{message.message}</p>
                                </div>
                            </div>
                        {/if}
                        {#if message.type == "warning"}
                            <div in:fade="{{ duration: 700 }}" class="Embed">
                                <div class="top warning">{message.name}</div>
                                <div class="bottom">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        {/if}
                        {#if message.type == "resub"}
                            <div in:fade="{{ duration: 700 }}" class="Embed">
                                <div class="top resub">{message.name}</div>
                                <div class="bottom">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        {/if}
                        {#if message.type == "sub"}
                            <div in:fade="{{ duration: 700 }}" class="Embed">
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
                <img src={actualPicture} alt=" "/>
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
        grid-template-columns: 1fr 0.2fr;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .textfields {
        padding: 3em 3em 0em 3em;
        margin: -3em -4em 0em -3em;
        /* grid-area: head; */
        overflow: hidden;
        overflow-y: auto;
        /* place-self: flex-end; */
    }

    .avatar {
        /* grid-area: avatar; */
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
        /* margin: 10px 20px 10px 20px; */
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
        border-radius: 10px;
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
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

        animation: disparition 20s both;
        width: max-content;

        text-align: right;
    } 

    li p{
        margin: 10px 20px 10px 20px;
        font-weight: 300;
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

    /* @media (min-width: 480px) {
        h1 {
        max-width: none;
        }

        p {
        max-width: none;
        }
    } */
</style>
