addEventListener('load', function () {
  (async function () {
    function waitContent() {
      return new Promise(function (res) {
        var n = 0;
        var t = setInterval(function () {
          var ok = document.querySelector('footer') && document.querySelectorAll('figure').length >= 5;
          if (ok || ++n > 60) { clearInterval(t); res(); }
        }, 100);
      });
    }
    await waitContent();
    try { await document.fonts.ready; } catch (e) {}
    var imgs = Array.from(document.images).filter(function (i) { return !i.complete; });
    await Promise.race([
      Promise.allSettled(imgs.map(function (i) { return i.decode(); })),
      new Promise(function (r) { setTimeout(r, 8000); })
    ]);
    setTimeout(function () { window.print(); }, 600);
  })();
});
