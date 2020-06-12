$(document).ready(function () {
    painel.eventos.init(); 
});

var painel = {}

painel.eventos = {
   init:()=>{
        
       painel.metodos.exibirMenu('BANNER');
   }
};

painel.metodos = {

    //METODO PARA EXIBIR A PÁGINA SELECIONADA NO MENU
    exibirMenu:(paginaExibir)=>{

        // carrega a pagina selecionada no menu
        if(paginaExibir.toUpperCase() == 'BANNER')
        $("#divExibirMenu").load("/views/backoffice/principal/banner/banner.html");
        else  if(paginaExibir.toUpperCase() == 'PRODUTOSDESTAQUE')
        $("#divExibirMenu").load("/views/backoffice/principal/produtosdestaque/produtosdestaque.html");
        else  if(paginaExibir.toUpperCase() == 'PROMOCAOLIMITE' || paginaExibir.toUpperCase() == 'EXCLUIR')
        $("#divExibirMenu").load("/views/backoffice/principal/promocaolimite/promocaolimite.html");
    }

}