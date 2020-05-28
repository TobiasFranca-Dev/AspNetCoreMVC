function AjaxModal() {
    $(document).ready(function () {
        $(function () {
            $.ajaxSetup({ cache: false });

            $("a[data-modal]").on("click",
                function (e) {
                    $('#myModalContent').load(this.href,
                        function () {
                            $('#myModal').modal({
                                keyboard: true
                            },
                                'show');
                            bindForm(this);
                        });
                    return false;
                });
        });

        function bindForm(dialog) {
            $("form", dialog).submit(function () {
                $.ajax({
                    url: this.action,
                    type: this.method,
                    data: $(this).serialize(),
                    success: function (result) {
                        if (result.success) {
                            $("#myModal").modal('hide');
                            $("#EnderecoTarget").load(result.url); //Carrega o resultado HTML para a div demarcada 
                        } else {
                            $("#myModalContent").html(result);
                            bindForm(dialog);
                        }
                    }
                });
                return false;
            });
        }
    });
}

function BuscaCep() {
    $(document).ready(function () {

        //Limpa valores do formulário de endereço
        function limpa_formulario_cep() {
            $("#Endereco_Logradouro").val("");
            $("#Endereco_Bairro").val("");
            $("#Endereco_Cidade").val("");
            $("#Endereco_Estado").val("");
        }

        //Quando o Cep perde o foco.
        $("#Endereco_Cep").blur(function () {

            //Nova variável "cep" somente com digitos
            var cep = $(this).val().replace(/\D/g, '');

            //Verifica se o campo cep possui valor informado
            if (cep != "") {

                //Expressão regular para validar o cep
                var validacep = /^[0-9]{8}$/

                //Verifica se o campo cep possui valor informado
                if (validacep.test(cep)) {

                    //preenche os campos com "..." enquanto consulta webservice.
                    $("#Endereco_Logradouro").val("...");
                    $("#Endereco_Bairro").val("...");
                    $("#Endereco_Cidade").val("...");
                    $("#Endereco_Estado").val("...");

                    //Consulta o webservice viacep.com.br/
                    $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?",
                        function (dados) {
                            if (!("erro" in dados)) {
                                //Atualiza os campos com valores da consulta.
                                $("#Endereco_Logradouro").val(dados.logradouro);
                                $("#Endereco_Bairro").val(dados.bairro);
                                $("#Endereco_Cidade").val(dados.localidade);
                                $("#Endereco_Estado").val(dados.uf);
                            } else {
                                //Cep pesquisado não foi encontrado
                                limpa_formulario_cep();
                                alert("CEP não encontrado.");
                            }
                        });

                }
                else {
                    //Cep é inválido
                    limpa_formulario_cep();
                    alert("Formato de CEP inválido");
                }
            }
            else {
                //Cep sem valor, limpa o formulário
                limpa_formulario_cep();
            }

        })

    })
}

