import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudService } from './solicitud.service';
import { Solicitud } from './entities/solicitud.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { domainToASCII } from 'url';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudRepositoryMock } from './solicitud-repository-mock';



/*
1. Crearemos un objeto mockSolicitudRepository que sustituya (mockee) al repositorio. 
Inicialmente mockSolicitudRepository estará vacío. Posteriormente le iremos añadiendo 
los métodos falseados (mockeados).

2. Construir un módulo de testing que reemplace el repositorio original de solicitudes 
por el mockeado que hemos creado en el paso anterior.
*/
describe('SolicitudService', () => {
  let service: SolicitudService;


  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitudService,
        {
          provide: getRepositoryToken(Solicitud),
          useClass: SolicitudRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<SolicitudService>(SolicitudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a solicitud', async () => {

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

    expect(await service.create(createSolicitudDto)).toEqual({ id: expect.any(Number), ...createSolicitudDto });

  });

  it('should update a solicitud', async () => {
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
    const solicitudId = 1;

    expect(await service.update(solicitudId, updateSolicitudDto)).toEqual({
      id: solicitudId,
      ...updateSolicitudDto,
    });
  });
});
