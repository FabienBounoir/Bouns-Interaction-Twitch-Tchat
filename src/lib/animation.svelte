<script>
    // import { onMount } from 'svelte';
    
    export let confetti;

    console.log(confetti)

    // let characters = ['🥳', '🎉', '✨', '👻'];

    // let confetti = new Array(100).fill()
    //     .map((_, i) => {
    //         return {
    //             character: characters[i % characters.length],
    //             x: Math.random() * 100,
    //             y: -20 - Math.random() * 100,
    //             r: 0.1 + Math.random() * 1
    //         };
    //     })
    //     .sort((a, b) => a.r - b.r);

    // let frame;

    // onMount(() => {
    
    //     function loop() {
    //         frame = requestAnimationFrame(loop);
    
    //         confetti = confetti.map(emoji => {
    //             emoji.y += 0.7 * emoji.r;
    //             if (emoji.y > 120) emoji.y = -20;
    //             return emoji;
    //         });
    //     }

    //     loop()
        
    //     return () => cancelAnimationFrame(frame);
    // });

</script>

<div>
    {#if confetti.length != 0}
        <h1>Coucou</h1>
    {/if}
    {#each confetti as c}
        <h1>test</h1>
        <span style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})">{c.character}</span>
    {/each}
</div>

<style>
    :global(body) {
		overflow: hidden;
	}

	span {
		position: absolute;
        z-index: 10;
		font-size: 5vw;
		user-select: none;
	}
</style>
