<script setup>
    import { fade, scale, slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { onMount } from "svelte";
    import { v4 } from "uuid";

    import agacer from "./assets/animation/agacer.png";
    import fete from "./assets/animation/fete.png";
    import grrr from "./assets/animation/grrr.png";
    import hop from "./assets/animation/hop.png";
    import love from "./assets/animation/love.png";
    import nice from "./assets/animation/nice.png";
    import yo from "./assets/animation/yo.png";
    import ah from "./assets/animation/ah.png";
    import explosion from "./assets/animation/explosion.png";
    import insulte from "./assets/animation/insulte.png";
    import non from "./assets/animation/non.png";
    import oups from "./assets/animation/oups.png";

    import bleucyan from "./assets/logo/logo-bleu-cyan.png";
    import bleuyellow from "./assets/logo/logo-bleu-yellow.png";
    import bleurouge from "./assets/logo/logo-cyan-rouge.png";
    import orange from "./assets/logo/logo-orange.png";
    import vert from "./assets/logo/logo-vert.png";
    import purple from "./assets/logo/logo-purple.png";
    import rainbow from "./assets/logo/logo-rainbow.png";
    import red from "./assets/logo/logo-red.png";
    import roseorange from "./assets/logo/logo-rose-orange.png";
    import violetcyan from "./assets/logo/logo-violet-cyan.png";
    import violet from "./assets/logo/logo-violet.png";
    import white from "./assets/logo/logo-white.png";
    import yellow from "./assets/logo/logo-yellow.png";
    import bits from "./assets/bits.gif";

    let asVideo = false;
    let lienVideo = "";
    const regexClip = new RegExp("(?:https://)?clips.twitch.tv/");

    let arrayBadge = [];

    //fetch badge twitch
    const fetchBadge = async () => {
        const response = await fetch(
            "https://badges.twitch.tv/v1/badges/global/display?language=fr"
        );
        const data = await response.json();
        arrayBadge = data.badge_sets;
    };

    //get query in Url
    let query = {};

    query = location.search.split(/[?&]/g).reduce((a, pair) => {
        if (!pair.trim()) return a;
        const [key, value] = pair.split("=");
        a[key] = value;
        return a;
    }, {});

    console.log(query);

    if (query.badge) {
        fetchBadge();
    }

    // @ts-ignore
    //init client connection
    const client = new tmi.Client({
        options: { debug: false },
        connection: {
            secure: true,
            reconnect: true,
        },
        // @ts-ignore
        channels: query?.chaine?.split(",") || ["badbounstv"],
    });

    //connection au tchat twitch
    client.connect();

    //component tchat
    let image = query?.customAvatar?.split(",") || [
        fete,
        hop,
        love,
        nice,
        yo,
        ah,
    ];
    let actualPicture = query?.customAvatar?.split(",")[0] || yo;
    let tchat = [];

    //frame de l'animation
    let frame;
    let timestamps = Date.now();

    //http://localhost:3000/index?chaine=lebouseuh,fruktozka,loeya,solaryfortnite,skyyart,ibai,thealvaro845,chess,pubg_battlegrounds,pubgkorea,joueur_du_grenier&subscription=true

    let theme = query.theme || "white";
    console.log(theme);

    let confetti = [];
    let timeout;

    let tchatMax = parseInt(query.maxdelete) || 8;
    let timeMessage = parseInt(query.timemessage) || 1000;

    onMount (() => {
        if(query.theme == "glass") {
            document.getElementsByTagName("ul")[0].classList.add("lineargradient");
        }
    });



    //remplace les text par les emotes correspondante
    function parseEmote(text, emotes) {
        var splitText = text.split("");
        for (var i in emotes) {
            var e = emotes[i];
            for (var j in e) {
                var mote = e[j];
                if (typeof mote == "string") {
                    mote = mote.split("-");
                    mote = [parseInt(mote[0]), parseInt(mote[1])];
                    var length = mote[1] - mote[0],
                        empty = Array.apply(null, new Array(length + 1)).map(
                            function () {
                                return "";
                            }
                        );
                    splitText = splitText
                        .slice(0, mote[0])
                        .concat(empty)
                        .concat(splitText.slice(mote[1] + 1, splitText.length));
                    console.log(
                        '<img class="emote" style="width: 1.5em;"  src="http://static-cdn.jtvnw.net/emoticons/v2/' +
                            i +
                            '/default/dark/3.0" alt="' +
                            i +
                            '">'
                    );
                    splitText.splice(
                        mote[0],
                        1,
                        '<span ><img class="emote" style="width: 1.5em; vertical-align: bottom;"  src="http://static-cdn.jtvnw.net/emoticons/v2/' +
                            i +
                            '/default/dark/3.0" alt="' +
                            i +
                            '"></span>'
                    );
                }
            }
        }
        return splitText.join("");
    }

    if (query.message === "true" || false) {
        client.on("message", async (channel, tags, message, self) => {
            if (tags["message-type"] == "whisper") return;

            console.log(tags)

            let tagsUrl = [];

            // console.log(tags["badges"]);

            if (query.badge) {
                if (tags["badges"]) {
                    for (let badge of Object.keys(tags["badges"])) {
                        const versionBadge = arrayBadge[badge];

                        if (badge == "subscriber") {
                            tagsUrl.push(
                                "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
                            );
                        } else {
                            let badgetversion =
                                versionBadge.versions[tags["badges"][badge]][
                                    "image_url_4x"
                                ];
                            if (!badgetversion) continue;
                            tagsUrl.push(badgetversion);
                        }
                    }
                }
            }

            if (
                query?.blacklist
                    ?.split(",")
                    .includes(tags["display-name"].toLowerCase())
            )
                return;

            if (tchat.length != 0) {
                randomAvatar();
            }

            if (message.includes("<") && message.includes(">")) {
                if (tags["display-name"].toLowerCase() != "badbounstv") {
                    message = message.replace(/</gm, "< ");
                }
            }

            if (regexClip.test(message)) {
                if (asVideo) {
                    asVideo = false;
                    lienVideo = "";
                }

                const id = message.split("clips.twitch.tv/")[1];
                const test =
                    "https://cy49zmt23f.execute-api.us-east-1.amazonaws.com/dev/download_clip?id=" +
                    id;

                try {
                    const data = await fetch(test).then((response) =>
                        response.json()
                    );
                    message = "🎬 " + data.data[0].title;

                    console.log(channel);
                    console.log(data.data[0].broadcaster_name.toLowerCase());
                    if (
                        channel == "#badbounstv" &&
                        channel ==
                            "#" + data.data[0].broadcaster_name.toLowerCase() &&
                        query.clip === "true"
                    ) {
                        lienVideo =
                            data.data[0].thumbnail_url.split("-preview")[0] +
                            ".mp4";
                        asVideo = true;
                    }
                } catch (erreur) {
                    console.log(erreur);
                }
            }

            let messageJson = {
                    message: `${
                        tags.emotes == null
                            ? message
                            : parseEmote(message, tags.emotes)
                    }`,
                    username: tags["display-name"],
                    type: "tchat",
                    tagsUrl,
                }

            if(query.theme == "glass")
            {
                messageJson.color = tags["color"]
            }

            push(messageJson,15000);

            if (tchat.length == 0) {
                setTimeout(() => {
                    randomAvatar();
                }, 500);
            }
        });
    }

    if (query.subscription === "true" || false) {
        client.on(
            "subscription",
            (channel, username, method, message, userstate) => {
                setAvatar(love);
                if (query.animsub === "true" || false) {
                    animation(
                        query?.customSub?.split(",") || [
                            bleucyan,
                            bleuyellow,
                            bleurouge,
                            orange,
                            vert,
                            purple,
                            rainbow,
                            red,
                            roseorange,
                            violetcyan,
                            violet,
                            white,
                            yellow,
                        ],
                        100,
                        20000
                    );
                }
                push(
                    {
                        message: `Merci pour le Sub @${username}`,
                        name: "Sub",
                        type: "sub",
                    },
                    30000
                );
            }
        );

        client.on(
            "resub",
            (channel, username, months, message, userstate, methods) => {
                setAvatar(fete);

                if (query.animsub === "true" || false) {
                    animation(
                        query?.customSub?.split(",") || [
                            bleucyan,
                            bleuyellow,
                            bleurouge,
                            orange,
                            vert,
                            purple,
                            rainbow,
                            red,
                            roseorange,
                            violetcyan,
                            violet,
                            white,
                            yellow,
                        ],
                        100,
                        20000
                    );
                }
                push(
                    {
                        message: `Merci pour le resub @${username}`,
                        name: `Resub ${userstate["msg-param-cumulative-months"]}eme mois`,
                        type: "resub",
                    },
                    30000
                );
            }
        );
    }

    client.on(
        "messagedeleted",
        (channel, username, deletedMessage, userstate) => {
            tchat = tchat.filter(
                (s) => s.message != deletedMessage || s.username != username
            );

            if (query.deleted === "true" || false) {
                setAvatar(oups);
                push({
                    message: `Attention à ton langage @${username}`,
                    name: "Warning",
                    type: "warning",
                });
            }
        }
    );

    if (query.subgift === "true" || false) {
        // client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
        //     setAvatar(nice)
        //     push({message: `Merci @${username} pour le sub offert à ${recipient}`, name: "Sub Gift", type: "sub"})
        // });

        client.on(
            "submysterygift",
            (channel, username, numbOfSubs, methods, userstate) => {
                let senderCount = ~~userstate["msg-param-sender-count"];

                setAvatar(explosion);
                if (query.animsubgift === "true" || false) {
                    animation(
                        query?.customSubGif?.split(",") || [
                            bleucyan,
                            bleuyellow,
                            bleurouge,
                            orange,
                            vert,
                            purple,
                            rainbow,
                            red,
                            roseorange,
                            violetcyan,
                            violet,
                            white,
                            yellow,
                        ],
                        100,
                        10000 * numbOfSubs
                    );
                }
                push(
                    {
                        message: `Merci @${username} pour ${
                            numbOfSubs > 1
                                ? `les ${numbOfSubs} sub gift`
                                : "le sub gift"
                        }`,
                        name: "Sub Gift",
                        type: "sub",
                    },
                    1000 * numbOfSubs > 60000 ? 60000 : 5000 * numbOfSubs
                );
            }
        );
    }

    if (query.cheer === "true" || false) {
        client.on("cheer", (channel, userstate, message) => {
            if (query.animcheer === "true" || false) {
                animation(
                    query?.customCheers?.split(",") || [bits],
                    100,
                    10000
                );
            }

            push(
                {
                    message: `Merci ${userstate["display-name"]} pour les ${userstate.bits} Bits`,
                    name: "Bits",
                    type: "cheers",
                },
                userstate.bits < 99
                    ? 1000
                    : userstate.bits < 1000
                    ? 5000
                    : userstate.bits < 4999
                    ? 15000
                    : userstate.bits * 3.5
            );
        });
    }

    client.on("clearchat", (channel) => {
        tchat = [];
    });

    if (query.ban === "true" || false) {
        client.on("ban", (channel, username, reason, userstate) => {
            setAvatar(insulte);
            push({
                message: `@${username} a été ban !`,
                name: "Ban",
                type: "ban",
            });
        });
    }

    if (query.timeout === "true" || false) {
        client.on(
            "timeout",
            (channel, username, reason, duration, userstate) => {
                setAvatar(agacer);
                push({
                    message: `@${username} expulsé pour ${duration} secondes`,
                    name: "Time Out",
                    type: "ban",
                });
            }
        );
    }

    const push = (snack, time = 5000) => {
        snack._id = v4();
        tchat = [...tchat, snack];

        if (tchat.filter((s) => s.type == "tchat").length > tchatMax) {
            tchat = tchat.slice(tchat.length - tchatMax);
        }

        if (query.save == "true") return;

        setTimeout(() => {
            tchat = tchat.filter((s) => s._id !== snack._id);
        }, time + timeMessage);
    };

    function setAvatar(avatar) {
        timestamps = Date.now();
        if (query?.customAvatar) {
            randomAvatar();
        } else {
            actualPicture = avatar;
        }
    }

    function randomAvatar() {
        if (Date.now() - timestamps > 5000) {
            timestamps = Date.now();
            actualPicture = image[Math.floor(Math.random() * image.length)];
        }
    }

    push({
        message:
            "Je me lance en septembre sans avoir pu négocier une rupture conventionnelle, jai peur a, Mais trop contente !!",
        username: "BadbounsTV",
        type: "tchat",
        tagsUrl: [],
    });
    push({
        message: "Bienvenue chez Basti tibaroc 🤗",
        username: "ICESOU",
        type: "tchat",
        tagsUrl: [
            "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
            "https://static-cdn.jtvnw.net/badges/v1/3158e758-3cb4-43c5-94b3-7639810451c5/3",
        ],
    });
    push({
        message: "et toi t'en fais de la musculation",
        username: "RushJumper",
        type: "tchat",
        tagsUrl: [
            "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
            "https://static-cdn.jtvnw.net/badges/v1/3158e758-3cb4-43c5-94b3-7639810451c5/3",
        ],
    });
    push({
        message: "@Akiyuki_000",
        username: "Akiyuki_000",
        type: "tchat",
        tagsUrl: [
            "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
            "https://static-cdn.jtvnw.net/badges/v1/3158e758-3cb4-43c5-94b3-7639810451c5/3",
        ],
    });
    push({
        message: "@Akiyuki_000",
        username: "Akiyuki_000",
        type: "tchat",
        tagsUrl: [
            "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
            "https://static-cdn.jtvnw.net/badges/v1/3158e758-3cb4-43c5-94b3-7639810451c5/3",
        ],
    });
    push({
        message: "@Akiyuki_000",
        username: "Akiyuki_000",
        type: "tchat",
        tagsUrl: [
            "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
            "https://static-cdn.jtvnw.net/badges/v1/3158e758-3cb4-43c5-94b3-7639810451c5/3",
        ],
    });

    // push({message: `cououeeg`, username:'BadbounsTV', type: "tchat"})
    // push({message: `@BadbounsTV a été ban !`, name:"Ban", type: "ban"})
    // push({message: `@BadbounsTV expulsé pour 120 secondes`, name:"Time Out", type: "ban"})
    // push({message: `Merci pour le Sub @BadbounsTV`, name: "Sub", type: "sub"})
    // push({message: `Merci pour le resub @BadbounsTV`, name: `Resub 12eme mois`, type: "resub"})
    // push({message: `Merci @BadbounsTV pour les 12 subs gifts`, name: "Sub Gift", type: "sub"})
    // push({message: `Attention à ton langage @Leskiel`, name:"Warning", type: "warning"})

    //create animation
    function animation(characters, nbElement, time) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            cancelAnimationFrame(frame);
            confetti = [];
        }, time);

        if (confetti.length != 0) return;

        confetti = new Array(nbElement)
            .fill()
            .map((_, i) => {
                return {
                    character: characters[i % characters.length],
                    x: Math.random() * 100,
                    y: -40 - Math.random() * 100,
                    r: 0.1 + Math.random() * 1,
                };
            })
            .sort((a, b) => a.r - b.r);

        function loop() {
            frame = requestAnimationFrame(loop);
            confetti = confetti.map((emoji) => {
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
            <img
                class="animationAvatar"
                style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})"
                src={c.character}
                alt=" "
            />
        {/each}
        <div
            class="gridApp {query.left === 'true' ? 'gridLeft' : 'gridRight'}"
            style="margin-bottom: {query.mbottom}; margin-top: {query.mtop}; margin-left: {query.mleft}; margin-right: {query.mright}"
        >
            <div class="textfields">
                <ul class={query.left === "true" ? "alignLeft" : "alignRight"}>
                    {#each tchat as message (message._id)}
                        <li
                            class={theme}
                            in:scale={{
                                duration:
                                    tchat.length > 3
                                        ? tchat.length > 6
                                            ? tchat.length >= tchatMax - 1
                                                ? 100
                                                : 100
                                            : 250
                                        : 500,
                            }}
                            out:slide
                        >
                            {#if message.type == "tchat"}
                                <p
                                    in:fade={{
                                        duration:
                                            tchat.length > 3
                                                ? tchat.length > 6
                                                    ? tchat.length >=
                                                      tchatMax - 1
                                                        ? 0
                                                        : 50
                                                    : 100
                                                : 200,
                                    }}
                                >
                                <span class="badges">
                                    {#each message.tagsUrl as badge (badge)}
                                        <img
                                            src={badge}
                                            alt=" "
                                            class="badge"
                                        />
                                    {/each}
                                </span>
                                <b class="username" style="{message.color ? ("color: "+ message.color) : ("")}">{message.username}:</b>
                                <br>
                                <span class="message">{@html message.message}</span>
                                </p>
                            {/if}
                            {#if message.type == "ban"}
                                <div in:fade={{ duration: 200 }} class="Embed">
                                    <div class="top ban">{message.name}</div>
                                    <div class="bottom">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            {/if}
                            {#if message.type == "warning"}
                                <div in:fade={{ duration: 200 }} class="Embed">
                                    <div class="top warning">
                                        {message.name}
                                    </div>
                                    <div class="bottom">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            {/if}
                            {#if message.type == "resub"}
                                <div in:fade={{ duration: 200 }} class="Embed">
                                    <div class="top resub">{message.name}</div>
                                    <div class="bottom">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            {/if}
                            {#if message.type == "sub"}
                                <div in:fade={{ duration: 200 }} class="Embed">
                                    <div class="top sub">{message.name}</div>
                                    <div class="bottom">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            {/if}
                            {#if message.type == "cheers"}
                                <div in:fade={{ duration: 200 }} class="Embed">
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
            <div class="avatar {query.avatar === 'true' ? '' : 'none'}">
                {#if tchat.length}
                    <img
                        in:scale={{ duration: 400 }}
                        out:scale={{ delay: 500, duration: 1000 }}
                        src={actualPicture}
                        alt=" "
                    />
                {/if}
            </div>
        </div>
    </div>
    {#if asVideo}
        <video
            class="videoClip"
            autoplay
            transition:scale={{ duration: 1000, easing: quintOut }}
            on:error={() => (asVideo = false)}
            on:ended={() => (asVideo = false)}
        >
            <source src={lienVideo} type="video/mp4" />
        </video>
    {/if}
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    .username{
        font-size: 0.8em;
        font-weight: normal;
    }

    .badge{
        vertical-align: middle;
    }

    .lineargradient {
        -webkit-mask-image: -webkit-gradient(linear, center top, center bottom, 
        color-stop(0.00,  rgba(0,0,0,0)),
        color-stop(1.00,  rgba(0,0,0,1)));
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

    .videoClip {
        position: fixed;
        top: 20;
        left: 20;
        width: 30%;
        object-fit: cover;
        z-index: -1;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

    div#saver img.animationAvatar {
        width: 5em;
    }

    .gridApp {
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

    .none {
        display: none;
    }

    .avatar img {
        /* border-radius: 100px; */
        width: 10em;
    }

    .Embed {
        display: grid;
        grid-template-areas:
            "Top"
            "Bottom";
    }

    .top {
        grid-area: Top;
        padding: 10px 20px 10px 20px;
        border-radius: 10px 10px 0px 0px;
        text-align: left;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .bottom {
        grid-area: Bottom;
    }

    /* type de message color */
    .ban {
        background: rgba(195, 40, 40, 0.7);
    }

    .resub {
        background: rgba(37, 149, 200, 0.801);
    }

    .sub {
        background: rgba(43, 170, 229, 0.7);
    }

    .warning {
        background: rgba(206, 142, 41, 0.7);
    }

    .cheers {
        background: rgba(175, 77, 253, 0.7);
    }

    .alignRight {
        text-align: -webkit-right;
    }

    .alignLeft {
        text-align: -webkit-left;
    }

    li {
        list-style-type: none;
/* 
        backdrop-filter: blur( 6px );
        -webkit-backdrop-filter: blur( 6px );  */

        /* background-color: rgb(176, 158, 149); */

        margin: 10px;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;

        width: max-content;
        max-width: 25em;

        border-radius: 10px;
    }

    .alignLeft li {
        transform-origin: bottom left;
        text-align: left;
    }

    .alignRight li {
        transform-origin: bottom right;
        text-align: right;
    }

    /* ////////////////////// theme ////////////////////: */

    .white {
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.3);
        /* background: rgba(218, 218, 218, 0.6); */
        background: rgba(199, 199, 199, 0.646);
        box-shadow: 0 8px 12px 0 rgba(31, 38, 135, 0.37);
        text-shadow: 0 2px 4px rgb(0 0 0 / 66%);
        /* text-shadow: 0 2px 4px rgb(71 97 206 / 36%);  */
    }

    .glass {
        background-color: rgba(42, 42, 42, 0.2);
        border-radius: 0.2em;
        padding: 0.2em;
        min-width: 25em;
        margin: 5px 10px;
        color: rgb(255, 255, 255);
    }

    .glass p .username {
        font-size: 0.8em;
        font-size: 200;
    }
    
    .glass p .message{
        font-size: 1em;
        font-weight: 300;
    }

    .glass:last-child {
        margin-bottom: 10px;
    }

    .glass p{
        margin: 10px;
    }

    .flatwhite {
        color: black;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: white;
        box-shadow: 0 5px 8px 0 rgb(31 38 135 / 37%);
    }

    .flatdark {
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: black;
        box-shadow: 0 5px 8px 0 rgb(31 38 135 / 37%);
    }

    .linearrgb {
        color: white;
        border: 1px solid rgb(255, 255, 255);
        background: linear-gradient(
            -45deg,
            rgba(238, 118, 82, 0.85),
            rgba(231, 60, 126, 0.85),
            rgba(35, 165, 213, 0.85),
            rgba(35, 213, 171, 0.85)
        );
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        box-shadow: 0 5px 8px 0 rgb(31 38 135 / 37%);
    }

    .bluepurple {
        color: white;
        border: 1px solid rgba(11, 4, 213, 0.731);
        background: linear-gradient(
            -45deg,
            rgba(35, 165, 213, 0.7),
            rgba(148, 35, 213, 0.7)
        );
        background-size: 400% 400%;
        animation: gradient 7s ease infinite;
        box-shadow: 0 5px 8px 0 rgb(31 38 135 / 37%);
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .rgb {
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.3);
        /* background: rgba(218, 218, 218, 0.6); */
        background: rgba(199, 199, 199, 0.646);
        box-shadow: 0 8px 12px 0 rgba(31, 38, 135, 0.37);
        text-shadow: 0 2px 4px rgb(0 0 0 / 66%);
        background-color: rgba(255, 0, 0, 0.6);
        animation: RGBWhiteMode 5s infinite linear;
    }

    @keyframes RGBWhiteMode {
        0% {
            background-color: rgba(193, 0, 0, 0.6);
        }
        12.5% {
            background-color: rgba(176, 58, 46, 0.6);
        }
        25% {
            background-color: rgba(175, 96, 26, 0.6);
        }
        37.5% {
            background-color: rgba(183, 149, 11, 0.6);
        }
        50% {
            background-color: rgba(35, 155, 86, 0.6);
        }
        62.5% {
            background-color: rgba(40, 116, 166, 0.6);
        }
        75% {
            background-color: rgba(31, 97, 141, 0.6);
        }
        87.5% {
            background-color: rgba(108, 52, 131, 0.6);
        }
        100% {
            background-color: rgba(193, 0, 0, 0.6);
        }
    }

    .dark {
        /* color: #101010; */
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 8px 12px 0 rgba(31, 38, 135, 0.37);
        /* text-shadow: 0 2px 4px rgb(150 155 176 / 36%); */
        /* background: rgb(44, 40, 40, 0.25); */

        /* text-shadow: 0 1px 4px rgb(150 155 176 / 76%); */
        background: rgb(44, 40, 40, 0.6);
        color: #e3dfdf;
        /* background: rgb(100, 100, 100, 0.8); */
    }

    /* //////////////////// Theme //////////////////// */

    .badge {
        margin: 0 0 0 0.12em;
    }

    .badge:first-child {
        margin: 0;
    }

    li p {
        margin: 10px 20px 10px 20px;
        font-weight: 350;
        align-items: center;
        word-wrap: break-word;
        /* display: flex; */
    }

    b {
        margin-bottom: auto;
    }

    li p p:first-child {
        margin: 10px 20px 10px 20px;
        font-weight: 300;
        align-items: center;
        display: flex;
        font-weight: bold;
    }

    .emote {
        width: 1.5em;
    }

    .badge {
        width: 0.9em;
    }
</style>
