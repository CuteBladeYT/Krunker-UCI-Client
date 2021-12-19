function strcpu_rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function strcpu_rnlg(type, length) {
    var result = "";
    switch (type) {
      case "number":
        var characters = "0123456789";
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        };
        break;
      case "string":
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        };
        break;
      case "mix":
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        };
        break;
    };
    return result;
}

