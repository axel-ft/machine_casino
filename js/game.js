if (document.cookie.match(/^(?:.*;)?\s*points\s*=\s*([^;]+)(?:.*)?$/)||[,null][1] !== null ) {
    document.cookie = "points=10";
    console.log("la");
}
if (document.cookie.match(/^(?:.*;)?\s*points\s*=\s*([^;]+)(?:.*)?$/)||[,null][1] == null ) {
    document.cookie = "points=20";
    console.log("ici");
}
