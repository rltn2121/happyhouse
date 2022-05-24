<template>
  <div class="mt-3">
    <div id="map"></div>
    <div id="myPosition mt-4">
      <!-- 부트스트랩 primary 버튼 -->
      <div class="mt-3"></div>
      <button
        type="button"
        class="btn btn-lg btn-primary"
        @click="getCurrentPosBtn()"
      >
        내 위치 가져오기
      </button>
      <div style="display: none">
        <p id="myLng">lng</p>
        <p id="myLat">lat</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      markers: [],
      infowindow: null,
      latitude: 0,
      longitude: 0,
    };
  },
  created() {
    if (!("geolocation" in navigator)) {
      return;
    }

    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;

        if (window.kakao && window.kakao.maps) {
          this.initMap();
        } else {
          const script = document.createElement("script");
          /* global kakao */
          script.onload = () => kakao.maps.load(this.initMap);
          script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7300a0d50f02823be6fba48f5ace8bf7&libraries=services";
          document.head.appendChild(script);
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  },

  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.latitude, this.longitude),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },

    displayMarkers(places) {
      var fragment = document.createDocumentFragment();
      var bounds = new kakao.maps.LatLngBounds();
      var listStr = "";

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();
      for (var i = 0; i < places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
        var marker = addMarker(placePosition, i);
        var itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title, code, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            displayInfowindow(marker, title, place);
          });

          kakao.maps.event.addListener(map, "click", function () {
            console.log(customOverlay);
            customOverlay.setMap(null);
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            customOverlay.setMap(null);
          };
        })(marker, places[i].aptName, places[i].aptCode, places[i]);

        fragment.appendChild(itemEl);
      }
      // 마커를 생성하고 지도에 표시합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    },

    //마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    },

    //검색결과 항목을 Element로 반환하는 함수입니다
    getListItem(index, place) {
      var el = document.createElement("li");
      var itemStr = `
		<span class="markerbg marker_${index + 1}></span>
		<div class="info"><h5>${place.aptName}</h5> <button>관심등록</button>
		<span>${place.sidoName} ${place.gugunName} ${place.dongName} ${
        place.jibun
      }</span>
	`;
      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    },

    //검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    //인포윈도우에 장소명을 표시합니다
    displayInfowindow(marker, title, place) {
      var content = `
		<div class="overlaybox">
			<div class="boxtitle">${title}</div>
			<div class="first"><img src="${root}/img/apt.png" style="width:247px; height:136px;" alt=""></div>
			<ul>
				<li class="up">
					<span class="title">건축년도</span>
					<span class="count">${place.buildYear}</span>
				</li>
				<li>
					<span class="title">주소</span>
					<span class="count">${place.sidoName} ${place.gugunName} ${place.dongName} ${place.jibun}</span>
				</li>
				<li>
					<span class="title">최신거래금액</span>
					<span class="count">${place.recentPrice}</span>
				</li>
				<li>
					<span class="last" id="recenthistor" data-toggle="modal" data-target="#myModal">아파트정보 update</span>
				</li>
			</ul>
		</div>
	`;
      var position = new kakao.maps.LatLng(
        marker.getPosition().getLat() + 0.00033,
        marker.getPosition().getLng() - 0.00003
      );
      customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });
      customOverlay.setMap(map);
    },

    //검색결과 목록의 자식 Element를 제거하는 함수입니다
    removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },

    locationLoadSuccess(pos) {
      // 현재 위치 받아오기
      var currentPos = new kakao.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      );

      console.log(currentPos);
      document.querySelector("#myLng").innerText = currentPos.La;
      document.querySelector("#myLat").innerText = currentPos.Ma;
      // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
      this.map.panTo(currentPos);

      // 마커 생성
      var marker = new kakao.maps.Marker({
        position: currentPos,
      });

      // 기존에 마커가 있다면 제거
      marker.setMap(null);
      marker.setMap(map);
      this.displayMarkers(marker);
    },

    locationLoadError(pos) {
      alert("위치 정보를 가져오는데 실패했습니다.");
    },

    // 위치 가져오기 버튼 클릭시
    getCurrentPosBtn() {
      console.log("위치 가져오기");
      navigator.geolocation.getCurrentPosition(
        this.locationLoadSuccess,
        this.locationLoadError
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 500px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
