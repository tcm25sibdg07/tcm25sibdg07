"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ClienteRepository = class ClienteRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, encomendaRepositoryGetter) {
        super(models_1.Cliente, dataSource);
        this.encomendaRepositoryGetter = encomendaRepositoryGetter;
        this.encomendas = this.createHasManyRepositoryFactoryFor('encomendas', encomendaRepositoryGetter);
        this.registerInclusionResolver('encomendas', this.encomendas.inclusionResolver);
    }
};
exports.ClienteRepository = ClienteRepository;
exports.ClienteRepository = ClienteRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.purpleblush')),
    tslib_1.__param(1, repository_1.repository.getter('EncomendaRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.PurpleblushDataSource, Function])
], ClienteRepository);
//# sourceMappingURL=cliente.repository.js.map