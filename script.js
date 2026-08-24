// script.js

// Wait for DOM content and GSAP to be ready
document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) {
    console.error('GSAP and ScrollTrigger are required');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  initScene1();
  initScene2();
  initScene3();
});

function initScene1() {
  /**
   * Scene 1: Descenso hacia el vehículo y transicion a motor.
   * Controla la cámara ficticia que baja desde vista aérea,
   * avanza a la carretera, el vehículo crece y pasa,
   * pasa a interior --> motor
   */

  const vehContainer = document.querySelector('.scene1-layer.vehicle-container');
  const road = document.querySelector('.scene1-layer.road');
  const cityscape = document.querySelector('.scene1-layer.cityscape');
  const fadeBlack = document.querySelector('.fade-to-black');

  // Timeline para scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#scene1',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // 1. Vista aérea: cityscape pequeño, vehicle muy pequeño y centrado arriba
  // 2. Descenso: escalamos y movemos cityscape, road aparece
  // 3. Acercamiento: vehicle crece, vehículo se mueve lateralmente
  // 4. Vehículo pasa frente a cámara: vehículo se mueve y desaparece opacidad
  // 5. Fade to black for transition

  // Cityscape parallax: bajamos la ciudad y hacemos zoom muy leve
  tl.fromTo(cityscape,
    { yPercent: -20, scale: 0.5, opacity: 0.8 },
    { yPercent: 0, scale: 1, opacity: 1, ease: 'power1.inOut' }, 0);

  // Road aparece desde abajo con aumento de opacidad
  tl.fromTo(road,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, ease: 'power1.out' }, 0.2);

  // Vehicle escala y baja, se mueve lateralmente para simular movimiento
  tl.fromTo(vehContainer,
    {
      y: -250,
      scale: 0.3,
      xPercent: -50,
      opacity: 1
    },
    {
      y: 0,
      scale: 1.4,
      xPercent: 50,
      ease: 'power1.out'
    }, 0.3);

  // Vehicle pasa frente a cámara: escala extra, opacity baja (simulamos paso rápido)
  tl.to(vehContainer,
    {
      scale: 2.3,
      opacity: 0,
      xPercent: 110,
      ease: 'power2.in',
      duration: 0.6
    }, 0.7);

  // Fade to black para transición al motor
  tl.to(fadeBlack, { opacity: 1, ease: 'power1.inOut' }, 1);

  // Dejar fade a opacidad 0 al salir para limpieza
  tl.to(fadeBlack, { opacity: 0, duration: 0.1, delay: 0.5 });

}

function initScene2() {
  /**
   * Scene 2: Motor funcionando antes, producto Cera Tec, motor despues.
   * Controla animaciones de piston, biela, cigüeñal y transicion producto.
   */

  const piston_before = document.querySelector('.motor-state.before .piston');
  const biela_before = document.querySelector('.motor-state.before .connecting-rod');
  const ciguenal_before = document.querySelector('.motor-state.before .crankshaft');
  const friction = document.querySelector('.motor-state.before .friction-effects');

  const piston_after = document.querySelector('.motor-state.after .piston');
  const biela_after = document.querySelector('.motor-state.after .connecting-rod');
  const ciguenal_after = document.querySelector('.motor-state.after .crankshaft');

  const productIntro = document.querySelector('.product-intro');
  const beforeMotor = document.querySelector('.motor-state.before');
  const afterMotor = document.querySelector('.motor-state.after');
  const benefits = document.querySelector('.benefits');

  // Tiempos iniciales
  const cycleDuration = 2; // segundos de ciclo completo animación motor

  // Timeline motor piezas en "ANTES"
  const tlMotorBefore = gsap.timeline({ repeat: -1, yoyo: true, paused: true });

  tlMotorBefore.to(piston_before, {
    y: -40,
    ease: "sine.inOut",
    duration: cycleDuration / 2
  }).to(piston_before, {
    y: 0,
    ease: "sine.inOut",
    duration: cycleDuration / 2
  });

  tlMotorBefore.to(biela_before, {
    rotation: 30,
    transformOrigin: "top center",
    ease: "sine.inOut",
    duration: cycleDuration / 2
  }, 0).to(biela_before, {
    rotation: -30,
    ease: "sine.inOut",
    duration: cycleDuration / 2
  }, cycleDuration / 2);

  tlMotorBefore.to(ciguenal_before, {
    rotation: 360,
    transformOrigin: "center center",
    ease: "linear",
    duration: cycleDuration
  }, 0);

  // Vibracion sutil friccion
  gsap.to(friction, {
    x: 1,
    y: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 0.1,
  });

  // Motor después piezas similar sin vibración en fricción, mostrar protective film
  // Animación similar pero mas suave y ciclos mas lentos

  const tlMotorAfter = gsap.timeline({ repeat: -1, yoyo: true, paused: true });

  tlMotorAfter.to(piston_after, {
    y: -22,
    ease: "sine.inOut",
    duration: cycleDuration,
  }).to(piston_after, {
    y: 0,
    ease: "sine.inOut",
    duration: cycleDuration,
  });

  tlMotorAfter.to(biela_after, {
    rotation: 15,
    transformOrigin: "top center",
    ease: "sine.inOut",
    duration: cycleDuration,
  }, 0).to(biela_after, {
    rotation: -15,
    ease: "sine.inOut",
    duration: cycleDuration,
  }, cycleDuration);

  tlMotorAfter.to(ciguenal_after, {
    rotation: 360,
    transformOrigin: "center center",
    ease: "linear",
    duration: cycleDuration * 2
  }, 0);

  // Animacion controlada por scroll + transiciones entre estados

  gsap.timeline({
    scrollTrigger: {
      trigger: '#scene2',
      start: 'top bottom-=100',
      end: 'bottom top+=200',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  })

  // Empezar mostrando estado ANTES
  .set(afterMotor, { autoAlpha: 0, y: 50 })
  .set(productIntro, { autoAlpha: 0, scale: 0.85 })
  .set(benefits, { autoAlpha: 0, y: 60 })

  // Motor antes visible y animaciones ON
  .call(() => {
    tlMotorBefore.play();
    tlMotorAfter.pause();
  }, null, 0)

  // Mostrar motor ANTES (opacidad 1)
  .to(beforeMotor, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)

  // Transicion de scroll: mostrar producto (fade & scale)
  .to(beforeMotor, { autoAlpha: 0, y: -40, duration: 0.8 }, 1.5)
  .to(productIntro, { autoAlpha: 1, scale: 1, duration: 1.3, ease: "back.out(1.4)" }, 1.8)

  // Producto visible un ratito
  .to(productIntro, { autoAlpha: 0, scale: 0.9, duration: 1, ease: "power1.inOut" }, 3.2)

  // Mostrar motor después, arrancar animacion motor después
  .to(afterMotor, { autoAlpha: 1, y: 0, duration: 1 }, 3.3)
  .call(() => {
    tlMotorAfter.play();
    tlMotorBefore.pause();
  }, null, 3.3)

  // Mostrar beneficios abajo al final
  .to(benefits, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power1.out" }, 3.4);
}

function initScene3() {
  /**
   * Scene 3: Paso del tiempo y desgaste.
   * Movimiento del divisor vertical con scroll y aparición progresiva de desgaste.
   */

  const container = document.querySelector('.wear-container');
  const divider = document.querySelector('.divider-line');
  const wornSurfaces = document.querySelector('.engine-part.surfaces.worn');
  const timeLeft = document.querySelector('.wear-left .time-indicator');
  const timeRight = document.querySelector('.wear-right .time-indicator');
  const timeProgressLabels = document.querySelectorAll('.time-progress .time-label');

  // ScrollTrigger timeline controla el movimiento del divisor y apariencia desgaste y tiempo

  gsap.timeline({
    scrollTrigger: {
      trigger: '#scene3',
      start: 'top center',
      end: 'bottom center',
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  })
  // Movimiento divider horizontal 50% a 75%
  .to(divider, {
    left: '75%',
    duration: 1,
    ease: 'power1.inOut',
  }, 0)

  // Incrementar desgaste (opacidad de elementos desgaste)
  .fromTo(wornSurfaces, 
    { filter: 'drop-shadow(0 0 9px #bf6132bb)', opacity: 0.4 },
    { filter: 'drop-shadow(0 0 18px #ff7c4cdd)', opacity: 1, duration: 1, ease: 'sine.inOut' }, 0.1)

  // Actualización visual tiempo km, mostrar intermedios con fade-in/outs
  // Tiempo izquierda baja opacidad (quedando más tenue)
  .to(timeLeft, { opacity: 0.35, duration: 1 }, 1)

  // Tiempo derecha sube opacidad (más visible)
  .to(timeRight, { opacity: 1, duration: 1 }, 1)

  // Tiempo intermedios aparecen y desaparecen a lo largo de progreso
  .to(timeProgressLabels[0], { opacity: 1, duration: 0.6, ease: "power1.inOut" }, 0.7)
  .to(timeProgressLabels[0], { opacity: 0, duration: 0.6, ease: "power1.inOut" }, 1.9)
  .to(timeProgressLabels[1], { opacity: 1, duration: 0.6, ease: "power1.inOut" }, 1.1)
  .to(timeProgressLabels[1], { opacity: 0, duration: 0.6, ease: "power1.inOut" }, 2.33);

  // Mostrar texto final progresivamente
  gsap.fromTo('.final-texts p', {
    autoAlpha: 0,
    y: 30,
  }, {
    scrollTrigger: {
      trigger: '#scene3',
      start: 'bottom 80%',
      end: 'bottom 50%',
      scrub: true,
    },
    autoAlpha: 1,
    y: 0,
    ease: 'power2.out',
  });

  gsap.fromTo('.final-product', {
    autoAlpha: 0,
    y: 40,
  }, {
    scrollTrigger: {
      trigger: '#scene3',
      start: 'bottom 65%',
      end: 'bottom 45%',
      scrub: true,
    },
    autoAlpha: 1,
    y: 0,
    ease: 'power2.out',
  });

  gsap.fromTo('.final-phrase', {
    autoAlpha: 0,
  }, {
    scrollTrigger: {
      trigger: '#scene3',
      start: 'bottom 60%',
      end: 'bottom 55%',
      scrub: true,
    },
    autoAlpha: 1,
    ease: 'power2.out',
  });
}

