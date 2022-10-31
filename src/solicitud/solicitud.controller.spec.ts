import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { DocumentBuilder } from '@nestjs/swagger';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';

describe('SolicitudController', () => {
  let controller: SolicitudController;

  //crearemos la implementación que mockea al método create del servicio. Se limitará a tomar un DTO 
  //y devolver un objeto con un id aleatorio (simulando lo que haría la base de datos) y el DTO
  let mockSolicitudService = {
    create: jest.fn((dto) => {
      return {
        id: Math.random() * (1000 - 1) + 1,
        ...dto,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id: id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudController],
      providers: [SolicitudService],
    }).overrideProvider(SolicitudService)
      .useValue(mockSolicitudService)
      .compile();

    controller = module.get<SolicitudController>(SolicitudController);
  });
  //Test para validar que el metodo este definido en el controllador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //test para validar la creacion de una solicitud y nos devuelva un objeto con un ID 
  //(da igual el se sea, en produccion seria el id que generaria la base de datos)
  //y el resto de campos coincidira con los DTOS de creacion de solicitudes
  it('Should create solicitud', () => {
    const createSolicitudDto: CreateSolicitudDto = {
      nombre: 'John Doe',
      cargo: 'Assistant Professor',
      unidad: 'Informatics Department',
      telefono: '1234',
      email: 'john.doe@gmail.com',
      tipo: '',
      nombreActividad: '',
      start: undefined,
      end: undefined,
      dia: '',
      horaInicio: '',
      horaFin: '',
    };

    //bloque de lo que se espera como resultado (expect) al invocar el test unitario
    expect(controller.create(createSolicitudDto)).toEqual({
      id: expect.any(Number),
      ...createSolicitudDto,
    });
  });

  //test para validar la actualizacion de una solicitud
  it('should update a solicitud', () => {
    const updateSolicitudDto: UpdateSolicitudDto = {
      nombre: 'John Smith',
      cargo: 'Assistant Professor',
      unidad: 'Informatics Department',
      telefono: '1234',
      email: 'john.doe@gmail.com',
      tipo: '',
      nombreActividad: '',
      start: undefined,
      end: undefined,
      dia: '',
      horaInicio: '',
      horaFin: '',
    };
    const solicitudId = 2;

    expect(controller.update(solicitudId, updateSolicitudDto)).toEqual(
      {
        id: solicitudId,
        ...updateSolicitudDto,
      },
    );
  });


});
