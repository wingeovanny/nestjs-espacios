import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { Solicitud } from './entities/solicitud.entity';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
export class SolicitudServiceMock {

    async create(createSolicitsDto: CreateSolicitudDto): Promise<Solicitud> {
        return Promise.resolve({
            id: Math.random() * (1000 - 1) + 1,
            ...createSolicitsDto
        });
    }

    async update(id: number, updateSolicitudDto: UpdateSolicitudDto): Promise<Solicitud> {
        return Promise.resolve({
            id: id,
            ...updateSolicitudDto
        }) as Promise<Solicitud>; //Forzamos el casting de la respuesta porque no pueden inferir que el tipo que devolvemos es correcto
    }
}
