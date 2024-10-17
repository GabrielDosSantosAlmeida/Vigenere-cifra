//envia metodo post para api descriptografar
    async function descriptografaComApi(textoCodificado, chave) {
        const response = await fetch("https://desafio9.onrender.com/decrypt_message", {
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    keyword: chave,
                    encrypted_message: textoCodificado
                }),
                method: "POST",
                mode: "cors"
            });
        const retornoJson = await response.json();

        if (retornoJson['decrypted_message']) {
            return retornoJson['decrypted_message'];
        } else {
            return retornoJson['error'];
        }
    }
        
    //função que criptografa
    function criptografa(texto, chave){
        const tamanhoAlfabeto = 26;
        const aCharCode = 'a'.charCodeAt(0);
        let textoCodificado = '';
        while (chave.length < texto.length) {
        chave += chave; 
        }
        for (let i=0; i< texto.length;i++){
            let textoChar = texto.charCodeAt(i) - aCharCode;

            let chaveChar = chave.charCodeAt(i) - aCharCode;
 
            let codificadoChar = (textoChar + chaveChar) % tamanhoAlfabeto;
            textoCodificado = textoCodificado + String.fromCharCode(codificadoChar + aCharCode);

        }
        return textoCodificado;
    }

    //executa o criptografa
    async function criptografaExecuta() {
        const texto = document.getElementById("textoNormal").value.toLowerCase();
        const chave = document.getElementById("chave").value.toLowerCase();
        const textoCodificado = criptografa(texto, chave);
        document.getElementById("resultado").innerText = "Texto codificado: " + textoCodificado;
    }
    //executa o descriptografa
    async function descriptografaExecuta() {
        const textoCodificado = document.getElementById("textoCodificado").value.toLowerCase();
        const chave2 = document.getElementById("chave2").value.toLowerCase();
        const respostaDaApi = await descriptografaComApi(textoCodificado, chave2);
        document.getElementById("respostaPost").innerText = "Texto decifrado pela API: " + respostaDaApi;
    }