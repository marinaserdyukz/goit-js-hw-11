import{a as u,S as f}from"./assets/vendor-BjNZPned.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const d="46234405-5fabb3e7cd0fd4a5073c0abd3",m="https://pixabay.com/api/";function p(s){return u.get(m,{params:{key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(o=>o.data)}const l=document.querySelector(".gallery"),c=document.querySelector(".loader"),y=new f(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){const o=s.map(r=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${r.largeImageURL}">
            <img
              class="gallery-image"
              src="${r.webformatURL}"
              alt="${r.tags}"
            />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${r.likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${r.views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${r.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${r.downloads}
              </p>
            </div>
          </a>
        </li>
      `).join("");l.insertAdjacentHTML("beforeend",o),y.refresh()}function g(){l.innerHTML=""}function b(){c.classList.remove("is-hidden")}function L(){c.classList.add("is-hidden")}const n=document.querySelector(".form");n.addEventListener("submit",s=>{s.preventDefault();const o=s.currentTarget.elements["search-text"].value.trim();if(!o){iziToast.error({title:"Error",message:"Please enter a search query!"});return}g(),b(),p(o).then(r=>{if(r.hits.length===0){iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}h(r.hits)}).catch(r=>{iziToast.error({title:"Error",message:"Something went wrong. Please try again later."})}).finally(()=>{L(),n.reset()})});
//# sourceMappingURL=index.js.map
