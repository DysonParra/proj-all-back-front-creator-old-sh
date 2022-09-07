
/**
 * @desc esta clase tendrá funciones para la interacción con los estados y los servicios
 * por ejemplo getMedicamentoActualizando$(), getMedicamentos(), cargarMedicamentos(), cargarMedicamentosPaginados(),
 * buscarMedicamentosPaginados(), cargarMedicamentosPaginadosHeaders(), buscarMedicamentosPaginadosHeaders()
 * agregarMedicamento(), actualizarMedicamento(), eliminarMedicamento()
 * @author Dyson Arley Parra Tilano dyson.parra@radartechnologies.com.co
 * @required medicamento.service, medicamento.state, medicamento.model
 */
@Injectable({
  providedIn: 'root'
})
export class TayudoFacade {
  constructor
    (
