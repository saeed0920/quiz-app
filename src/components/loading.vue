<template>
  <div class="loading fixed z-10 bg-[#c99a70]">
    <span class="main">
      <span></span>
      <span></span>
    </span>

    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.lds-roller {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4rem;
  transform: translate(-50%, -50%);
  height: 4rem;
  @media only screen and (min-width: 37.5em) {
    display: none !important;
  }
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  height: 100vh;
  width: 100vw;
}
.main {
  display: block;
  position: relative;
  width: 20rem;
  height: 20rem;
  top: 50%;
  left: 50%;
  z-index: 11;
  background-color: transparent;
  transform: translate(-50%, -50%) rotate(0);
  animation: rotate 1.5s infinite;
  @media only screen and (max-width: 37.5em) {
    display: none;
  }
  &::after,
  span,
  &::before {
    content: "";
    position: absolute;
    width: 4rem;
    height: 4rem;
    z-index: 12;
    top: 50%;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0 0.6rem 0.2rem rgba(0, 0, 0, 0.1);
  }
  &::after {
    background-color: #00cc9d;
    animation: go-right 3s infinite;

    @media only screen and (max-width: 37.5em) {
      display: none;
    }
  }
  &::before {
    background-color: #01c083;
    animation: go-left 3s infinite;

    @media only screen and (max-width: 37.5em) {
      display: none;
    }
  }

  & span:first-of-type {
    background-color: #50a1bc;
    animation: go-left-left 3s infinite;

    @media only screen and (max-width: 37.5em) {
      display: none;
    }
  }
  & span:last-of-type {
    background-color: #025692;
    animation: go-right-right 3s infinite;
    @media only screen and (max-width: 37.5em) {
      display: none;
    }
  }

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotateP {
    from {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(405deg);
    }
  }

  @keyframes go-right {
    0% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, -50%) translateX(5rem);
    }
    100% {
      transform: translate(-50%, -50%) translateX(0);
    }
  }
  @keyframes go-left {
    0% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, -50%) translateX(-5rem);
    }
    100% {
      transform: translate(-50%, -50%) translateX(0);
    }
  }
  @keyframes go-left-left {
    0% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, -50%) translateX(-15rem);
    }
    100% {
      transform: translate(-50%, -50%) translateX(0);
    }
  }
  @keyframes go-right-right {
    0% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, -50%) translateX(15rem);
    }
    100% {
      transform: translate(-50%, -50%) translateX(0);
    }
  }
}
</style>
