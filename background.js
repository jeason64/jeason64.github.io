// 优化的3D星空背景
let scene, camera, renderer, stars;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('background').appendChild(renderer.domElement);

    // 创建更多的星星，使背景更丰富
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    const colors = [];

    // 增加星星数量并添加不同大小和颜色
    for (let i = 0; i < 15000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );

        // 随机星星大小
        sizes.push(Math.random() * 2 + 0.5);

        // 随机颜色（偏蓝色调）
        colors.push(
            0.7 + Math.random() * 0.3, // R
            0.7 + Math.random() * 0.3, // G
            1, // B
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    stars = new THREE.Points(geometry, material);
    scene.add(stars);
    camera.position.z = 500;

    // 添加视差效果
    document.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) {
    const mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    const mouseY = (event.clientY - window.innerHeight / 2) * 0.05;

    camera.position.x += (mouseX - camera.position.x) * 0.01;
    camera.position.y += (-mouseY - camera.position.y) * 0.01;
    camera.lookAt(scene.position);
}

function animate() {
    requestAnimationFrame(animate);
    
    // 平滑的旋转效果
    stars.rotation.y += 0.0002;
    stars.rotation.x += 0.0001;
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();