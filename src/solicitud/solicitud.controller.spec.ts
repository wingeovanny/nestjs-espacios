import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudServiceMock } from './solicitud-service-mock';

describe('SolicitudController', () => {
  let controller: SolicitudController;
  let service: SolicitudService //	1 Declaración del servicio


  beforeEach(async () => {

    const SolicitudServiceProvider = { //2 SolicitudServiceProvider mockea el provider SolicitudService
      provide: SolicitudService,
      useClass: SolicitudServiceMock
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudController],
      providers: [SolicitudService, SolicitudServiceProvider],//3 	Se añade SolicitudServiceProvider como otro provider
    }).overrideProvider(SolicitudService)
      .useValue(SolicitudServiceProvider) //4 Inicialización del mock a la clase del mock del servicio (Inyección de dependencias)
      .compile();

    controller = module.get<SolicitudController>(SolicitudController);
    service = module.get<SolicitudService>(SolicitudService);// 5 	Inicialización del servicio al servicio de la solicitud, que está mockeado
  });

  //Test para validar que el metodo este definido en el controllador
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //test para validar la creacion de una solicitud y nos devuelva un objeto con un ID 
  //(da igual el se sea, en produccion seria el id que generaria la base de datos)
  //y el resto de campos coincidira con los DTOS de creacion de solicitudes
  it('Should create solicitud', async () => {//6 Caso de prueba asíncrono por el await en métodos dentrol del caso de prueba
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
    expect(await controller.create(createSolicitudDto)).toEqual({//7 robamos que la solicitud se crea correctamente y devuelve los valores esperados. La ejecución se hace con await
      id: expect.any(Number),
      ...createSolicitudDto,
    });
  });

  //test para validar la actualizacion de una solicitud
  it('should update a solicitud', async () => {// 8	Caso de prueba asíncrono por el await en métodos dentro del caso de prueba
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
    //valida que permite ingresar un id y el dto para ver si se actualiza correctamente
    expect(await controller.update(solicitudId, updateSolicitudDto)).toEqual( //9 Probamos que la actualización de una solicitud se realiza correctamente y devuelve los valores esperados. La ejecución se hace con await
      {
        id: solicitudId,
        ...updateSolicitudDto,
      },
    );

    //10 Crear un espía para el método update en service
    const updateSpy = jest.spyOn(service, 'update');

    //11Hacer una actualización de solicitud
    controller.update(solicitudId, updateSolicitudDto);

    // valida para si el servicio es llamado con los argumentos correctos por parte del controllador.
    //Probamos que el servicio espiado ha sido llamado por el controlador con los parámetros adecuados
    expect(updateSpy).toHaveBeenCalledWith(solicitudId, updateSolicitudDto);

  });


});
