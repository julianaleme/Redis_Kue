module.exports.criafilakue = function criafilakue(jobs,dados){
  console.log( 'Incluindo Atividade Job #' + dados.celVisitante);
  jobs.create( 'activity_log', {
    phone: dados.celVisitante,
    linkwhats: dados.linkwhats,
    nome: dados.nome,
    status:'100'
  }).priority('high')
    .save();
}