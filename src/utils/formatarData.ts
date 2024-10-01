export default function formatarData(data: string) {
    // Cria um objeto de data a partir da string
    let dataObj = new Date(data);

    // Extrai o dia, mês e ano
    let dia = String(dataObj.getDate()).padStart(2, '0');
    let mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Os meses começam em 0, então somamos 1
    let ano = String(dataObj.getFullYear());

    // Extrai as horas, minutos e segundos
    let horas = String(dataObj.getHours()).padStart(2, '0');
    let minutos = String(dataObj.getMinutes()).padStart(2, '0');
    //let segundos = String(dataObj.getSeconds()).padStart(2, '0');

    // Formata a data no formato dd/mm/aa - hh:mm:ss
    return `${dia}/${mes}/${ano} - ${horas}h${minutos}`;
}
