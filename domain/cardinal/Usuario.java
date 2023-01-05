/*
 * @fileoverview    {Usuario} se encarga de realizar tareas específicas.
 *
 * @version         2.0
 *
 * @author          Dyson Arley Parra Tilano <dysontilano@gmail.com>
 *
 * @copyright       Dyson Parra
 * @see             github.com/DysonParra
 *
 * History
 * @version 1.0     Implementación realizada.
 * @version 2.0     Documentación agregada.
 */
package com.rtc.project.definicion.dominio;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TODO: Definición de {@code Usuario}.
 *
 * @author Dyson Parra
 * @since 1.8
 */
@Entity
@Table(catalog = "cardinal", schema = "")
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(nullable = false)
    private Long intCedulaUsuario;
    @Column(length = 50)
    private String strNombreUsuario;
    @Column(length = 50)
    private String strApellidoUsuario;
    @Column(length = 30)
    private String strSeudonimo;
    private Character enmTipoUsuario;
    @Column(length = 30)
    private String strContrasena;
    @Column(length = 30)
    private String strCargoUsuario;
    @OneToMany(mappedBy = "intCedulaUsuario")
    private Collection<RegistroVehiculo> registroVehiculoCollection;

}
