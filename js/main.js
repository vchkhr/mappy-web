if (window.location.href.indexOf("destinationService=") > -1) {
    destinationService = window.location.href.split("destinationService=")[1].split("&")[0];
    $("input[value='" + destinationService + "']").prop("checked", true);

    console.log("Destination service founded in hash: " + destinationService);
}

function convert() {
    console.log("\n= Converting link =");

    destinationService = document.querySelector("input[name='destinationService']:checked").value;
    console.log("Destination service: " + destinationService);

    originalLink = document.getElementById("originalLink").value;
    console.log("Original link: " + originalLink);

    if ((originalLink == "test") || (originalLink == "тест")) {
        originalLink = "https://mpro.maps.yandex.ru/?ll=32.064450%2C49.441349&z=20&l=mp%23sat&branch=0&activity=editor";
    }

    let status = "ok";

    if (originalLink.length == 0) {
        status = "the original link is empty";
        $("#originalLink").focus();
    } else if (originalLink.includes("n.maps.yandex")) {
        coord = originalLink.split("?z=");
        coord = coord[1];

        coord = coord.split("&l=");
        coord = coord[0];

        coord = coord.split("&ll=");
        destinationCoordZ = coord[0];
        coord = coord[1];

        coord = coord.split("%2C");
        destinationCoordX = coord[1];
        destinationCoordY = coord[0];
    } else if (originalLink.includes("mpro.maps.yandex")) {
        coord = originalLink.split("?ll=");
        coord = coord[1];

        coord = coord.split("&l=");
        coord = coord[0];

        coord = coord.split("&z=");
        destinationCoordZ = coord[1];
        coord = coord[0];

        coord = coord.split("%2C");
        destinationCoordX = coord[1];
        destinationCoordY = coord[0];
    } else if (originalLink.includes("mapcreator.here")) {
        coord = originalLink.split("l=");
        coord = coord[1];

        coord = coord.split(",");
        destinationCoordX = coord[0];
        destinationCoordY = coord[1];
        destinationCoordZ = coord[2];
    } else if ((originalLink.includes("google")) && (originalLink.includes("/maps"))) {
        coord = originalLink.split("maps/@");
        coord = coord[1];

        coord = coord.split(",");
        destinationCoordX = coord[0];
        destinationCoordY = coord[1];

        coord = coord[2];
        if (coord.includes("z")) {
            coord = coord.split("z");
            destinationCoordZ = coord[0];
        } else if (coord.includes("m")) {
            coord = coord.split("m");
            destinationCoordZ = coord[0];

            if ((destinationCoordZ >= 30) && (destinationCoordZ <= 55)) {
                destinationCoordZ = 20;
            } else if (destinationCoordZ <= 100) {
                destinationCoordZ = 19;
            } else if (destinationCoordZ <= 200) {
                destinationCoordZ = 18;
            } else if (destinationCoordZ <= 420) {
                destinationCoordZ = 17;
            } else if (destinationCoordZ <= 835) {
                destinationCoordZ = 16;
            } else if (destinationCoordZ <= 1680) {
                destinationCoordZ = 15;
            } else {
                destinationCoordZ = 14;
            }
        } else {
            destinationCoordZ = 17;
        }

        destinationCoordZ = String(destinationCoordZ).split('.')[0]
    } else if (originalLink.includes("wego.here")) {
        coord = originalLink.split("?map=");
        coord = coord[1];

        coord = coord.split(",");
        destinationCoordX = coord[0];
        destinationCoordY = coord[1];
        destinationCoordZ = coord[2];
    } else if (originalLink.includes("openstreetmap")) {
        coord = originalLink.split("#map=");
        coord = coord[1];

        coord = coord.split("/");
        destinationCoordX = coord[1];
        destinationCoordY = coord[2];
        destinationCoordZ = coord[0];
    } else if ((originalLink.includes("yandex")) && (originalLink.includes("/maps"))) {
        coord = originalLink.split("?ll=");
        coord = coord[1];

        coord = coord.split("%2C");
        destinationCoordY = coord[0];
        coord = coord[1];

        coord = coord.split("&z=");
        destinationCoordX = coord[0];
        destinationCoordZ = coord[1];
    } else if (originalLink.includes("mapillary.com/app/")) {
        coord = originalLink.split("mapillary.com/app/?lat=");
        coord = coord[1];

        coord = coord.split("&lng=");
        destinationCoordX = coord[0];
        coord = coord[1];

        coord = coord.split("&z=");
        destinationCoordY = coord[0];
        destinationCoordZ = coord[1];
    } else if (originalLink.includes("2gis")) {
        coord = originalLink.split("2gis.ru/?m=");
        coord = coord[1];

        coord = coord.split("%2C");
        destinationCoordY = coord[0];
        coord = coord[1];

        coord = coord.split("%2F");
        destinationCoordX = coord[0];
        destinationCoordZ = coord[1];
    } else {
        status = "the original service is not found";
    }

    console.log("Status: " + status);

    if (status != "ok") {
        return;
    }

    console.log("Destination coord X: " + destinationCoordX + "\nDestination coord Y: " + destinationCoordY + "\nDestination coord Z: " + destinationCoordZ);

    if (destinationService == "GoogleMaps") {
        if (destinationCoordZ == 21) {
            destinationCoordZ = 30;
        } else if (destinationCoordZ == 20) {
            destinationCoordZ = 55;
        } else if (destinationCoordZ == 19) {
            destinationCoordZ = 100;
        } else if (destinationCoordZ == 18) {
            destinationCoordZ = 200;
        } else if (destinationCoordZ == 17) {
            destinationCoordZ = 420;
        } else if (destinationCoordZ == 16) {
            destinationCoordZ = 835;
        } else if (destinationCoordZ == 15) {
            destinationCoordZ = 1680;
        } else {
            destinationCoordZ = 3360;
        }
    }

    if (destinationService == "OpenStreetMap") {
        destinationURL = "https://www.openstreetmap.org/#map=" + destinationCoordZ + "/" + destinationCoordX + "/" + destinationCoordY + "";
    } else if (destinationService == "HEREWeGo") {
        destinationURL = "https://wego.here.com/?map=" + destinationCoordX + "," + destinationCoordY + "," + destinationCoordZ + ",satellite&l=sat,satellite";
    } else if (destinationService == "GoogleMaps") {
        destinationURL = "https://www.google.com/maps/@" + destinationCoordX + "," + destinationCoordY + "," + destinationCoordZ + "m/data=!3m1!1e3";
    } else if (destinationService == "HEREMapCreator") {
        destinationURL = "https://mapcreator.here.com/mapcreator/" + destinationCoordX + "," + destinationCoordY + "," + destinationCoordZ + ",0,0,satellite.here?lang=en";
    } else if (destinationService == "Mapillary") {
        destinationURL = "https://www.mapillary.com/app?lat=" + destinationCoordX + "&lng=" + destinationCoordY + "&z=" + destinationCoordZ + "";
    } else if (destinationService == "GoogleStreetView") {
        destinationURL = "http://maps.google.com/maps?q=&layer=c&cbll=" + destinationCoordX + "," + destinationCoordY + "";
    } else if (destinationService == "YandexYedinaiaKarta") {
        destinationURL = "https://mpro.maps.yandex.ru/?ll=" + destinationCoordY + "%2C" + destinationCoordX + "&z=" + destinationCoordZ + "&l=mp%23sat&branch=0&activity=editor";
    } else if (destinationService == "YandexNarodnaiaKarta") {
        destinationURL = "https://yandex.ru/maps/?ll=" + destinationCoordY + "%2C" + destinationCoordX + "&z=" + destinationCoordZ + "&l=sat";
    } else if (destinationService == "YandexKarty") {
        destinationURL = "https://n.maps.yandex.ru/#!/?z=" + destinationCoordZ + "&ll=" + destinationCoordY + "%2C" + destinationCoordX + "&l=nk%23sat";
    } else if (destinationService == "Visicom") {
        destinationURL = "https://maps.visicom.ua/c/" + destinationCoordY + "," + destinationCoordX + "," + destinationCoordZ + "/a/0,1,2,3,4,5,6,7?lang=ru";
    } else if (destinationService == "TwoGis") {
        destinationURL = "https://2gis.ru/?queryState=center%2F" + destinationCoordY + "%2C" + destinationCoordX + "%2Fzoom%2F" + destinationCoordZ + "";
    } else {
        destinationURL = "#error";
    }

    console.log("Destination URL: " + destinationURL);
    window.open(destinationURL, "_blank");

    if (window.location.href.indexOf("?") > -1) {
        if (window.location.href.indexOf("#") > -1) {
            hash = window.location.href.split("#")[1];
            window.location = window.location.href.split("?")[0] + "?destinationService=" + destinationService + "#" + hash;
        } else {
            window.location = window.location.href.split("?")[0] + "?destinationService=" + destinationService;
        }
    } else {
        if (window.location.href.indexOf("#") > -1) {
            url = window.location.href.split("#");
            window.location = url[0] + "?destinationService=" + destinationService + "#" + url[1];
        } else {
            window.location = window.location.href + "?destinationService=" + destinationService;
        }
    }
}
