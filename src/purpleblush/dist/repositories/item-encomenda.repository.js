"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemEncomendaRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ItemEncomendaRepository = class ItemEncomendaRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, encomendaRepositoryGetter, produtoRepositoryGetter) {
        super(models_1.ItemEncomenda, dataSource);
        this.encomendaRepositoryGetter = encomendaRepositoryGetter;
        this.produtoRepositoryGetter = produtoRepositoryGetter;
        this.produto = this.createBelongsToAccessorFor('produto', produtoRepositoryGetter);
        this.registerInclusionResolver('produto', this.produto.inclusionResolver);
        this.encomenda = this.createBelongsToAccessorFor('encomenda', encomendaRepositoryGetter);
        this.registerInclusionResolver('encomenda', this.encomenda.inclusionResolver);
    }
};
exports.ItemEncomendaRepository = ItemEncomendaRepository;
exports.ItemEncomendaRepository = ItemEncomendaRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.purpleblush')),
    tslib_1.__param(1, repository_1.repository.getter('EncomendaRepository')),
    tslib_1.__param(2, repository_1.repository.getter('ProdutoRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.PurpleblushDataSource, Function, Function])
], ItemEncomendaRepository);
//# sourceMappingURL=item-encomenda.repository.js.map