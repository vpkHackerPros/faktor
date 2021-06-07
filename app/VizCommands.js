export default class VizCommands {
  crawl_LOAD () {
    return '0 SCENE*TV3_FAKTOR/PLAYOUT/CRAWL_VIDEO_BACK LOAD\0'
  }
  crawl_IN () {
    return '0 RENDERER*FRONT_LAYER SET_OBJECT SCENE*TV3_FAKTOR/PLAYOUT/CRAWL_VIDEO_BACK\0' + 
           '0 RENDERER*FRONT_LAYER*STAGE*DIRECTOR*$CRAWL_VIDEO_BACK_IN START\0' +
           '0 RENDERER*FRONT_LAYER*TREE*$CRAWL_VIDEO_BACK*KEY*DRAW_KEY SET 1 \0'
  }
  crawl_SetText (text) {
    return `0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL*GEOM*text SET <SET Text "${text }">$Text\0` 
  }
  crawl_BUILD () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL*GEOM*build INVOKE\0'
  }
  crawl_UPDATE () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL*GEOM*update INVOKE\0'
  }
  crawl_START  () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL*GEOM*start INVOKE\0'
  }
  crawl_CONTINUE () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL*GEOM*cont INVOKE\0'
  }
  crawl_STOP () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL*GEOM*stop INVOKE\0'
  }
  crawl_OUT () {
    return '0 RENDERER*FRONT_LAYER*STAGE*DIRECTOR*$CRAWL_VIDEO_BACK_OUT START\0'
  }

  
  celaPasicaIn() {
    const getFormatedDate = () => {
      const date = new Date()
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }
    return '0 RENDERER SET_OBJECT SCENE*LJUBLJANA_TV_POPOLDAN/PLAYOUT/MAIN_SCENE\0' +
      `0 RENDERER*TREE*$DATE*GEOM*TEXT SET ${getFormatedDate()}\0` +
      '0 RENDERER*TREE*$PASICE*KEY*DRAW_KEY SET 1 \0' +
      '0 RENDERER*STAGE*DIRECTOR*$MAIN_PASICA_IN START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$RDECA_1_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$RDECA_2_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$RDECA_3_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$RDECA_4_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$RDECA_5_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$RDECA_6_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_1_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_2_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_3_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_4_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_5_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_6_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$DESNA_2_IN START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$CLOCK_IN START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$DESNO_NASLOV_IN START\0' 
  }        
  celaPasicaOut() {
    return '0 RENDERER SET_OBJECT SCENE*LJUBLJANA_TV_POPOLDAN/PLAYOUT/PASICE\0' +
      '0 RENDERER*STAGE*DIRECTOR*$MAIN_PASICA_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_1_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_2_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_3_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_4_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_5_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_6_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$DESNA_2_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$CLOCK_OUT START\0' +
      '0 RENDERER*STAGE*DIRECTOR*$DESNO_NASLOV_OUT START\0' 
  }        
  changeStories = (stories,titles) => {
    return (
      [
      '0 RENDERER SET_OBJECT SCENE*LJUBLJANA_TV_POPOLDAN/PLAYOUT/MAIN_SCENE\0' +
      `0 RENDERER*TREE*$TXT_2_DESNA*GEOM*TEXT SET ${stories[0]}\0`+
      `0 RENDERER*TREE*$NASLOV_1*GEOM*TEXT SET ${titles[0]}\0`,
      `0 RENDERER*TREE*$TXT_3_DESNA*GEOM*TEXT SET ${stories[1]}\0` +
      `0 RENDERER*TREE*$NASLOV_2*GEOM*TEXT SET ${titles[1]}\0`,
      ]
    )
  }
  changeContents = (data) => {
    return (
      [
      `0 RENDERER*TREE*$N_1*GEOM*TEXT SET ${data[0].title}\0` +
      `0 RENDERER*TREE*$Z_1_Z_TXT*GEOM*TEXT SET ${data[0].top}\0` +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_1_IN START\0' +
      `0 RENDERER*TREE*$Z_1_S_TXT*GEOM*TEXT SET ${data[0].bottom}\0` ,
      
      `0 RENDERER*TREE*$N_2*GEOM*TEXT SET ${data[1].title}\0` +
      `0 RENDERER*TREE*$Z_2_Z_TXT*GEOM*TEXT SET ${data[1].top}\0` +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_2_IN START\0' +
      `0 RENDERER*TREE*$Z_2_S_TXT*GEOM*TEXT SET ${data[1].bottom}\0` ,
      
      `0 RENDERER*TREE*$N_3*GEOM*TEXT SET ${data[2].title}\0` +
      `0 RENDERER*TREE*$Z_3_Z_TXT*GEOM*TEXT SET ${data[2].top}\0` +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_3_IN START\0' +
      `0 RENDERER*TREE*$Z_3_S_TXT*GEOM*TEXT SET ${data[2].bottom}\0` ,
      
      `0 RENDERER*TREE*$N_4*GEOM*TEXT SET ${data[3].title}\0` +
      `0 RENDERER*TREE*$Z_4_Z_TXT*GEOM*TEXT SET ${data[3].top}\0` +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_4_IN START\0' +
      `0 RENDERER*TREE*$Z_4_S_TXT*GEOM*TEXT SET ${data[3].bottom}\0` ,
      
      `0 RENDERER*TREE*$N_5*GEOM*TEXT SET ${data[4].title}\0` +
      `0 RENDERER*TREE*$Z_5_Z_TXT*GEOM*TEXT SET ${data[4].top}\0` +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_5_IN START\0' +
      `0 RENDERER*TREE*$Z_5_S_TXT*GEOM*TEXT SET ${data[4].bottom}\0` ,
      
      `0 RENDERER*TREE*$N_6*GEOM*TEXT SET ${data[5].title}\0` +
      `0 RENDERER*TREE*$Z_6_Z_TXT*GEOM*TEXT SET ${data[5].top}\0` +
      '0 RENDERER*STAGE*DIRECTOR*$ZELENA_6_IN START\0' +
      `0 RENDERER*TREE*$Z_6_S_TXT*GEOM*TEXT SET ${data[5].bottom}\0` 
      ]
    )
  }
  changeContents2 = (data, isRed, wasRed) => {
    return (
      data.map((item, iter) => {
        console.log(isRed)
        if (isRed[iter]) {
          return (
            //`0 RENDERER*STAGE*DIRECTOR*$${ wasRed[iter] ? 'RDECA' : 'ZELENA' }_${iter + 1}_OUT START\0` +
            (wasRed[iter] ? '' : `0 RENDERER*STAGE*DIRECTOR*$ZELENA_${iter + 1}_OUT START\0`) +
            `0 RENDERER*STAGE*DIRECTOR*$RDECA_${iter + 1}_IN START\0` +
            `0 RENDERER*TREE*$N_${iter + 1}*GEOM*TEXT SET ${item.title}\0` +
            `0 RENDERER*TREE*$R_${iter + 1}_Z_TXT*GEOM*TEXT SET ${item.top}\0` +
            `0 RENDERER*TREE*$R_${iter + 1}_S_TXT*GEOM*TEXT SET ${item.bottom}\0`
          )
        } else {
          return (
            //`0 RENDERER*STAGE*DIRECTOR*$${ wasRed[iter] ? 'RDECA' : 'ZELENA' }_${iter + 1}_OUT START\0` +
            (wasRed[iter] ? `0 RENDERER*STAGE*DIRECTOR*$RDECA_${iter + 1}_OUT START\0` : '') +
            `0 RENDERER*STAGE*DIRECTOR*$ZELENA_${iter + 1}_IN START\0` +
            `0 RENDERER*TREE*$N_${iter + 1}*GEOM*TEXT SET ${item.title}\0` +
            `0 RENDERER*TREE*$Z_${iter + 1}_Z_TXT*GEOM*TEXT SET ${item.top}\0` +
            `0 RENDERER*TREE*$Z_${iter + 1}_S_TXT*GEOM*TEXT SET ${item.bottom}\0`
          )
        }
      })
    )
  }
  podpis = ( content, isLeft ) => {
    return ([
      '0 RENDERER SET_OBJECT SCENE*LJUBLJANA_TV_POPOLDAN/PLAYOUT/MAIN_SCENE\0' +
      `0 RENDERER*TREE*$TXT_PODPIS_${ isLeft ? '1' : '2'}*GEOM*TEXT SET ${ content }\0` +
      `0 RENDERER*STAGE*DIRECTOR*$PODPIS_${ isLeft ? '1' : '2' }_IN START\0`,
      `0 RENDERER*STAGE*DIRECTOR*$PODPIS_${ isLeft ? '1' : '2' }_OUT START\0`
    ]
    )
  } 
//ljtv








//konec ljtv











// CRAWL 1
  crawl_LOAD_1 () {
    return '0 SCENE*TV3_FAKTOR/PLAYOUT/CRAWL_VIDEO_BACK LOAD\0'
  }
  crawl_IN_1 () {
    return '0 RENDERER*FRONT_LAYER SET_OBJECT SCENE*TV3_FAKTOR/PLAYOUT/CRAWL_VIDEO_BACK\0' + 
           '0 RENDERER*FRONT_LAYER*STAGE*DIRECTOR*$CRAWL_VIDEO_BACK_IN START\0' +
           '0 RENDERER*FRONT_LAYER*TREE*$CRAWL_VIDEO_BACK*KEY*DRAW_KEY SET 1 \0'
  }
  crawl_SetText_1 (text) {
    return `0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL_1*GEOM*text SET <SET Text "${text }">$Text\0` 
  }
  crawl_BUILD_1 () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL_1*GEOM*build INVOKE\0'
  }
  crawl_UPDATE_1 () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL_1*GEOM*update INVOKE\0'
  }
  crawl_START_1  () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL_1*GEOM*start INVOKE\0'
  }
  crawl_CONTINUE_1 () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL_1*GEOM*cont INVOKE\0'
  }
  crawl_STOP_1 () {
    return '0 RENDERER*FRONT_LAYER*TREE*$DEXTER_CRAWL_1*GEOM*stop INVOKE\0'
  }
  crawl_OUT_1 () {
    return '0 RENDERER*FRONT_LAYER*STAGE*DIRECTOR*$CRAWL_VIDEO_BACK_OUT START\0'
  }



  pasice_IN () {
    return '0 RENDERER SET_OBJECT SCENE*TV3_FAKTOR/PLAYOUT/PASICE\0' +
           '0 RENDERER*TREE*$PASICE*KEY*DRAW_KEY SET 1 \0'
  }
  tema_IN = (text) => {
    return (
      '0 RENDERER SET_OBJECT SCENE*TV3_FAKTOR/PLAYOUT/PASICE\0'+
      '0 RENDERER*TREE*$PASICE*KEY*DRAW_KEY SET 1 \0' +
      '0 RENDERER*STAGE*DIRECTOR*$TEMA_IN START\0' +
      `0 RENDERER*TREE*$TEMA_TXT*GEOM*TEXT SET ${text }\0`
    )
  } 
  tema_OUT = () => {
    return '0 RENDERER*STAGE*DIRECTOR*$TEMA_OUT START\0'
  }

  podpis_IN = (text) => {
    return (
      '0 RENDERER SET_OBJECT SCENE*TV3_FAKTOR/PLAYOUT/PASICE\0' +
      '0 RENDERER*TREE*$PASICE*KEY*DRAW_KEY SET 1 \0' +
      '0 RENDERER*STAGE*DIRECTOR*$PODPIS_IN START\0' +
      `0 RENDERER*TREE*$PODPIS_TXT*GEOM*TEXT SET ${text}\0`
    )
  }        
  podpis_OUT = () => {
    return '0 RENDERER*STAGE*DIRECTOR*$PODPIS_OUT START\0'
  }
  podpis_triplex_IN = (text) => {
    return (
      '0 RENDERER SET_OBJECT SCENE*TV3_FAKTOR/PLAYOUT/PASICE\0' +
      '0 RENDERER*TREE*$PASICE*KEY*DRAW_KEY SET 1 \0' +
      '0 RENDERER*STAGE*DIRECTOR*$PODPIS_3_IN START\0' +
      `0 RENDERER*TREE*$NAME_1*GEOM*TEXT SET ${text[0]}\0` +
      `0 RENDERER*TREE*$NAME_2*GEOM*TEXT SET ${text[1]}\0` +
      `0 RENDERER*TREE*$NAME_3*GEOM*TEXT SET ${text[2]}\0`
    )
  }        
  podpis_triplex_OUT = () => {
    return '0 RENDERER*STAGE*DIRECTOR*$PODPIS_3_OUT START\0'
  }
}
