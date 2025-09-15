import carros from "../models/dados.js";

//Buscar itens
const getAllcarros = (req, res) => {
    const { id, nome, modelo, ano, cor, qtdeVitorias } = req.query;
    let resultado = carros;

    if(nome) {
        resultado = resultado.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    if(id) {
        resultado = resultado.filter(c => c.id === parseInt(id))
    }    

    if(ano) {
        resultado = resultado.filter(c => c.ano === ano)
    }

    if(modelo) {
        resultado = resultado.filter(c => c.modelo.toLowerCase().includes(modelo.toLowerCase()))
    }

    if(cor) {
        resultado = resultado.filter(c => c.cor.toLowerCase().includes(cor.toLowerCase()))
    }

    if(qtdeVitorias) {
        resultado = resultado.filter(c => c.qtdeVitorias == qtdeVitorias)
    }
    
    res.status(200).json({
        total: resultado.length,
        carros: resultado
    });
};

const getCarrosByld = (req, res) => {
    const id = parseInt(req.params.id);
    const carro = carros.find(c => c.id === id);

    if(!carro) {
        return res.status(404).json({
            message: "Carro não encontrado"
        });
    }
    
    res.status(200).json(carro);    
};

const createCarro = (req, res) => {
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body || {};

    if(!nome || !modelo || !cor) {
        return res.status(400).json({
            success: false,
            message: "Nome, modelo e cor são obrigatórios"
        });
    }

    const novoCarro = {
        id: carros.length + 1,
        nome,
        modelo,
        ano,
        cor,
        qtdeVitorias
    };

    carros.push(novoCarro);
    res.status(201).json({
        success: true,
        message: "Novo carro cadastrado com sucesso",
        carros: novoCarro
    });
};

//Delete
const deleteCarros = (req, res) => {
    const id = parseInt(req.params.id);

    //Verificação
    if(isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID selecionado é invalido"
        });
    }

    //Verificar se não tem outro Carro com o ID
    const carroParaRemover = carros.find(b => b.id === id);

    if(!carroParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Carro com o ID ${id} não existe`
        });
    }

    //Remover carro com o ID
    const carrosFiltrados = carros.filter(c => c.id !== id);
    carros.splice(0, carros.length, ...carrosFiltrados);


    res.status(200).json({
        success: true,
        message: `O carro com o ${id} foi removido com sucesso`
    })
};

//Update
const updateCarros = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido!"
        })
    }

    const carroExiste = carros.find(c => c.id === id);
    if(!carroExiste){
        return res.status(404).json({
            success: false,
            message: "O Carro com o id " + id + " é inexistente"
        })
    }

    const carrosAtualizado = carros.map(c => 
        c.id === id ? {
            ...c,
            ...(nome && { nome }),
            ...(modelo && { modelo }),
            ...(cor && { cor }),
            ...(qtdeVitorias && { qtdeVitorias }),
            ...(ano &&  { ano })
        } : c
    );

    carros.splice(0, carros.length, ...carrosAtualizado);
    const carroEditado = carros.find(c => c.id === id);

    res.status(200).json({
        success: true,
        message: "Dados do Carro atualizado",
        carro: carroEditado
    })
}

export { getAllcarros, getCarrosByld, createCarro, deleteCarros, updateCarros };