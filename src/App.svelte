<script>
    import { Router, Route, Link } from "svelte-routing";
    import Visuel from "./pages/visuel.svelte";
    import Home from "./pages/config.svelte";
    export let url = "";
</script>

<Router url="{url}">
    <div>
        //route rendu de l'animation
        <Route path="visuel" component="{Visuel}" /> 

        //route config
        <Route path="/"><Home /></Route>

        //route par defaut
        <Route path="/*"><Home /></Route>
    </div>
</Router>
