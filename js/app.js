$(function(){
  var mov=1; var score=0; var mxx=[0]; var punt=0;
  setInterval(function() {
    animTit();
  }, 100);

  $(".btn-reinicio").click(function(){
    var MtrizElim=[]; var Mm=[];  var mcual=[[0],[1]];
    if ($(this)["0"].innerHTML=='reiniciar') {
      location.reload();
    }else {
      $(this).html('reiniciar')
      for (var i = 1; i < 8; i++) {
        for (var j = 1; j < 8; j++) {
          var sel='.col-'+i+'';
          var pos=''+i+j;
          $(sel).append('<img src="image/'+Math.round(3*Math.random()+1)+'.png" alt="" class="elemento" id="'+pos+'">');
        }
      }
    comienza();

    var min=0; var seg=120;
    timm=setInterval(function (){
      seg=seg-1;
      min=Math.floor(seg/60);
      s=seg%60;
      $('#timer').html('0'+min+':'+s);
      if ($('#timer').html()=='00:0') {
        timm=clearInterval(timm);
        $(".time").hide();
        for (var i = 1; i < 8; i++) {
          $('.col-'+i).remove();
        }
        $('.panel-score').animate({
          width: '+=10000'
        },1700);
        $('.panel-tablero').hide(function() {
            $(".panel-score").prepend('<h1 class="main-titulo">Juego Terminado</h1>');
          })
      }
    },1000);
  }
  });
  function moverObj() {
      var xm=[0];
      for (var i = 1; i < 8; i++) {
        for (var j = 1; j < 8; j++) {
          $('#'+i+j).droppable({
            accept:"#"+(i+1)+j+", #"+(i-1)+j+", #"+i+(j+1)+", #"+i+(j-1)+"",
            drop: function(event, ui){
              imagenUno = this;
              imagenDos = ui.draggable[0];
              imgUno = $(imagenUno).attr("src");
              imgDos = $(imagenDos).attr("src");
              $(imagenUno).attr("src", imgDos);
              $(imagenDos).attr("src", imgUno);
              ido=event.target;
              imdd = $(ido)["0"].attributes["0"].value;
              ido2=ido;
              idstar=$(event.target)[0].id
            }
          });
          $('#'+i+j).draggable({
            revert: true,
            containment: ".panel-tablero",
            start: function(event, ui){
              $("#movimientos-text").html(mov++);
              delete ido;

            },
            stop: function (event, ui) {
              comienza();
              if (mxx.length<1) {
                if (typeof(ido)!="undefined") {
                  imuu=this;
                  iun=$(imuu).attr('src');
                  idstop=$(imuu)["0"].id;
                  $(imuu).attr("src", imdd);
                  $(ido2).attr("src", iun);
                  delete ido;
                }
              }
            }
            });
        }
      }
  }
    function comienza() {
      MtrizElim=[0]; otraM=[0];
        MtrizElim=validar();
        mxx=MtrizElim;
        todo(MtrizElim);
        setTimeout(function() {
          MtrizElim=validar();
          if (MtrizElim.length<1) {
            return;
          }else {
            comienza();
          }
        },3500)
    }
    function rellenar() {
      miVt=[0];
      miVt=verifElemComp();
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j <miVt[i];  j++) {
          elp=7-miVt[i];
          if (elp!=0) {
            s=$('.col-'+(i+1))["0"].children[j].attributes[3].value=""+(i+1)+((j+1)+elp);
          }
        }
      }
      aniadir();
    }
    function aniadir() {
      miVtr=[0];
      miVtr=verifElemComp();
      for (var i = 1; i < 8; i++) {
        e=7-miVtr[i-1];
        for (var j = 0; j < e; j++) {
          f=e-j;
          $('.col-'+i).prepend('<img src="image/'+Math.round(3*Math.random()+1)+'.png" alt="" class="elemento" id="'+i+f+'">');
          $("#"+i+f).css({ "position": "relative", "top": ""+(-(f-1)*170.996)+"px", "left": "" })
          $("#"+i+f).animate({
            top: ""+(0)+"px"
          },100);
        }
      }
      moverObj();
    }
    function verifElemComp() {
      var mtzd=[];
      for (var i = 0; i < 7; i++) {
        mtzd[i]=$('.col-'+(i+1))["0"].children.length
      }
      return mtzd;
    }
  function todo(MtrizElim){
    examinar(MtrizElim);
    setTimeout(function(){
      cicloWhile();
      return
    },570);
  }
  function cicloWhile() {
    var bra=0; var bnh=[];
      bnh=validar();
      f1(bnh);
      f2();
      function f1(hg){
        examinar(hg);
      }
      function f2(){
        bnh=validar();
        f3(bnh);
      }
      function f3(bx){
        if (bx.length<1) {
          rellenar();
          return
        }else {
          todo(bx);
        }
      }
  }
  function eliminar(u,d) {
    if (u!=0&&d!=0) {
      elid=$('.col-'+d)[0].children[u-1].attributes[3].value;
      selector=$('#'+elid);
      $(selector).hide(250,function(){
      this.remove();
      });
    }
  }
  function parpadeo(f,c) {
    if (f!=0&&c!=0) {
      elid=$('.col-'+c)[0].children[f-1].attributes[3].value;
      selector=$('#'+elid);
      selector.animate({opacity:'0'},100);
      selector.animate({opacity:'1'});
      selector.animate({opacity:'0'},100);
      selector.animate({opacity:'1'});
      if (score>8) {
        punt=punt+1;
        $("#score-text").html(punt);
        score=0;
      }
      score=score+1;
    }
  }

  function examinar(matrizElim) {
    for (var i = 0; i < matrizElim.length; i++) {
      for (var j = 0; j < 3; j++) {
        uni=matrizElim[i][j];
        for (var h = i+1; h < matrizElim.length; h++) {
          for (var l = 0; l < 3; l++) {
            if (uni==matrizElim[h][l]) {
              matrizElim[h][l]=0;
            }
          }
        }
      }
    }
    for (var i = 0; i < matrizElim.length; i++) {
      for (var j = 0; j < 3; j++) {
        uni=matrizElim[i][j]%10;
        dec=(matrizElim[i][j]-uni)/10;
        parpadeo(uni,dec);
        eliminar(uni,dec);
      }
  }
  }

  function validar() {
    var velim=[]; m=0;
    for (var j = 1; j < 8; j++) {
      var k=0;
      var ch=$('.col-'+j)[0].children;
      if (ch.length>2) {
        while (k<(ch.length-2)) {
          var h1=ch[k].attributes.src.nodeValue;
          var h2=ch[k+1].attributes.src.nodeValue;
          var h3=ch[k+2].attributes.src.nodeValue;
          if (h1==h2 && h2==h3) {
            x1=''+j+(k+1);x2=''+j+(k+2);x3=''+j+(k+3);
            vv=[parseFloat(x1),parseFloat(x2),parseFloat(x3)];
            velim[m]=vv;
            m=m+1;
          }
          k=k+1;
        }
      }
    }

    for (var i = 1; i < 6; i++) {
      r=0; cl=1; ban=0;
      c1=$('.col-'+i)["0"].children.length;
      c2=$('.col-'+(i+1))["0"].children.length;
      c3=$('.col-'+(i+2))["0"].children.length;

      if (c1==c2 && c2==c3) {
        while (cl<=c1) {
          sr1=$('.col-'+i)["0"].children[r].attributes.src.nodeValue;
          sr2=$('.col-'+(i+1))["0"].children[r].attributes.src.nodeValue;
          sr3=$('.col-'+(i+2))["0"].children[r].attributes.src.nodeValue;
          r=r+1;
          cl=cl+1;
          if (sr1==sr2 && sr2==sr3) {
            x1=''+i+r;x2=''+(i+1)+r;x3=''+(i+2)+r;
            vv=[parseFloat(x1),parseFloat(x2),parseFloat(x3)];
            velim[m]=vv;
            m=m+1;
          }
        }
      }else if (c1==c2) {
        if (c2>c3){
          ban=3;
        }else{
          ban=1;
        }
      }else if (c1<c2){
        if(c1<=c3){
          ban=1;
        }else {
          ban=3;
        }
      }else if(c2<=c3){
        ban=2;
      }else{
        ban=3;
      }

      switch (ban) {
        case 1:
        while (cl<=c1) {
          sr1=$('.col-'+i)["0"].children[r].attributes.src.nodeValue;
          sr2=$('.col-'+(i+1))["0"].children[c2-c1+r].attributes.src.nodeValue;
          sr3=$('.col-'+(i+2))["0"].children[c3-c1+r].attributes.src.nodeValue;
          r=r+1;
          cl=cl+1;
          if (sr1==sr2 && sr2==sr3) {
            x1=''+i+r;
            x2=''+(i+1)+((c2-c1)+r);
            x3=''+(i+2)+((c3-c1)+r);
            vv=[parseFloat(x1),parseFloat(x2),parseFloat(x3)];
            velim[m]=vv;
            m=m+1;
          }
        }
          break;
        case 2:
        while (cl<=c2) {
          sr1=$('.col-'+i)["0"].children[c1-c2+r].attributes.src.nodeValue;
          sr2=$('.col-'+(i+1))["0"].children[r].attributes.src.nodeValue;
          sr3=$('.col-'+(i+2))["0"].children[c3-c2+r].attributes.src.nodeValue;
          r=r+1;
          cl=cl+1;
          if (sr1==sr2 && sr2==sr3) {
            x1=''+i+((c1-c2)+r);
            x2=''+(i+1)+r;
            x3=''+(i+2)+((c3-c2)+r);
            vv=[parseFloat(x1),parseFloat(x2),parseFloat(x3)];
            velim[m]=vv;
            m=m+1;
          }
        }
          break;
        case 3:
        while (cl<=c3) {
          sr1=$('.col-'+i)["0"].children[r+c1-c3].attributes.src.nodeValue;
          sr2=$('.col-'+(i+1))["0"].children[c2-c3+r].attributes.src.nodeValue;
          sr3=$('.col-'+(i+2))["0"].children[r].attributes.src.nodeValue;
          r=r+1;
          cl=cl+1;
          if (sr1==sr2 && sr2==sr3) {
            x1=''+i+((c1-c3)+r);
            x2=''+(i+1)+((c2-c3)+r);
            x3=''+(i+2)+r;
            vv=[parseFloat(x1),parseFloat(x2),parseFloat(x3)];
            velim[m]=vv;
            m=m+1;
          }
        }
          break;
        default:
      }

    }
    return velim;
  }
  function animTit(){
    $(".main-titulo").animate({color: "#DCFF0E"}, 500),
    $(".main-titulo").animate({color: "#FFFFFF"}, 500)
  }
});
