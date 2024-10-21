        const canvas = document.getElementById('pendulumCanvas');
        const ctx = canvas.getContext('2d');

        const gravity = 0.03;
        const length = 200;
        const segments = 80;
        const ballSize = 10;
        // const angleDeg=45;
        let angleDeg=-80;
        const text = "HAPPYBIRTHDAY";
        const angleRad = angleDeg * (Math.PI / 180);
        let s =0;
        const colors = [
            "#e74c3c", "#8e44ad", "#3498db", "#1abc9c", "#2ecc71",
            "#f1c40f", "#e67e22", "#e74c3c", "#9b59b6", "#2980b9",
            "#27ae60", "#f39c12", "#d35400", "#c0392b"
        ];
        const pendulums = [
            // {
            //     origin: { x: 400, y: 50 },
            //     rope: [],
            //     released: true
            // }
        ];

        for( let j = 0; j < 13; j++ ){
            if(j == 5){
                s = s+60 ;
                angleDeg=80;
            }
            pendulums.push({
                origin: { x: 300+j*40+s, y: 0 },
                rope: [],
                released: true,
                color: colors[j % colors.length]
            });
            // if(j == 4) continue;
            const angleRad = angleDeg * (Math.PI / 180);
            for (let i = 0; i <= segments; i++) {
                const x = pendulums[j].origin.x + (i * length / segments) * Math.sin(angleRad);
                const y = pendulums[j].origin.y + (i * length / segments) * Math.cos(angleRad);
                pendulums[j].rope.push({
                    x: x,
                    y: y,
                    oldX: x,
                    oldY: y
                });
            }
        }
        
        
        

        function addPendulum() {
            // const originX = parseFloat(document.getElementById('originX').value);
            // const originY = parseFloat(document.getElementById('originY').value);
            const originX=400
            const originY=50
            const angleDeg=45
            // const angleDeg = parseFloat(document.getElementById('angle').value);
            const angleRad = angleDeg * (Math.PI / 180);

            const pendulum = {
                origin: { x: originX, y: originY },
                rope: [],
                released: true
            };

            for (let i = 0; i <= segments; i++) {
                const x = pendulum.origin.x + (i * length / segments) * Math.sin(angleRad);
                const y = pendulum.origin.y + (i * length / segments) * Math.cos(angleRad);
                pendulum.rope.push({
                    x: x,
                    y: y,
                    oldX: x,
                    oldY: y
                });
                console.log(pendulum.rope);
            }
            pendulums.push(pendulum);
        }

        function updatePendulums() {
            for (const pendulum of pendulums) {
                if (pendulum.released) {
                    for (let i = 1; i < pendulum.rope.length; i++) {
                        const segment = pendulum.rope[i];
                        const vx = (segment.x - segment.oldX) * 0.99;
                        const vy = (segment.y - segment.oldY) * 0.99 + gravity;

                        segment.oldX = segment.x;
                        segment.oldY = segment.y;
                        segment.x += vx;
                        segment.y += vy;
                    }

                    for (let i = 0; i < 5; i++) {
                        pendulum.rope[0].x = pendulum.origin.x;
                        pendulum.rope[0].y = pendulum.origin.y;

                        for (let j = 1; j < pendulum.rope.length; j++) {
                            const segmentA = pendulum.rope[j - 1];
                            const segmentB = pendulum.rope[j];
                            const dx = segmentB.x - segmentA.x;
                            const dy = segmentB.y - segmentA.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const difference = (length / segments - dist) / dist;
                            const offsetX = dx * difference * 0.5;
                            const offsetY = dy * difference * 0.5;

                            if (j > 1) {
                                segmentA.x -= offsetX;
                                segmentA.y -= offsetY;
                            }
                            segmentB.x += offsetX;
                            segmentB.y += offsetY;
                        }
                    }
                }
            }

            detectCollisions();
        }

        function detectCollisions() {
            for (let i = 0; i < pendulums.length; i++) {
                for (let j = i + 1; j < pendulums.length; j++) {
                    const ballA = pendulums[i].rope[pendulums[i].rope.length - 1];
                    const ballB = pendulums[j].rope[pendulums[j].rope.length - 1];
                    const dx = ballB.x - ballA.x;
                    const dy = ballB.y - ballA.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < ballSize * 2) {
                        const angle = Math.atan2(dy, dx);
                        const overlap = ballSize * 2 - distance;

                        const moveX = Math.cos(angle) * overlap / 2;
                        const moveY = Math.sin(angle) * overlap / 2;

                        ballA.x -= moveX;
                        ballA.y -= moveY;
                        ballB.x += moveX;
                        ballB.y += moveY;

                        const velocityAX = (ballA.x - ballA.oldX);
                        const velocityAY = (ballA.y - ballA.oldY);
                        const velocityBX = (ballB.x - ballB.oldX);
                        const velocityBY = (ballB.y - ballB.oldY);

                        ballA.oldX = ballA.x - velocityBX;
                        ballA.oldY = ballA.y - velocityBY;
                        ballB.oldX = ballB.x - velocityAX;
                        ballB.oldY = ballB.y - velocityAY;
                    }
                }
            }
        }

        function drawPendulums() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const pendulum of pendulums) {
                ctx.beginPath();
                ctx.moveTo(pendulum.rope[0].x, pendulum.rope[0].y);
                for (let i = 1; i < pendulum.rope.length; i++) {
                    ctx.lineTo(pendulum.rope[i].x, pendulum.rope[i].y);
                }
                // ctx.strokeStyle = '#000';
                ctx.strokeStyle = pendulum.color;
                ctx.lineWidth = 2;
                ctx.stroke();

                const ballX = pendulum.rope[pendulum.rope.length - 1].x;
                const ballY = pendulum.rope[pendulum.rope.length - 1].y;

                // Draw the "H" at the position of the pendulum instead of a ball
                ctx.font = "bold 50px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = pendulum.color;
                ctx.fillText(text[pendulums.indexOf(pendulum)], ballX, ballY);
                // ctx.fillText(text[pendulums.indexOf(pendulum)], pendulum.bob.x, pendulum.bob.y);
            }
        }

        function animate() {
            updatePendulums();
            drawPendulums();
            requestAnimationFrame(animate);
        }

        animate();