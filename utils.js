function lineralInterpolation(A, B, t) {
    return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {

    // lerp functions    what is 't' and 'u'
    // Ix = Ax + (Bx - Ax) * t = Cx + (Dx-Cx)  * u 
    // Iy = Ay + (By - Ay) * t = Cy + (Dy-Cy)  * u 

    // Ax + (Bx-Ax) * t = Cx + (Dx-Cx) * u  | -Cx
    // Ax - Cx + (Bx-Ax) * t = (Dx-Cx) * u 

    // Ay + (By-Ay) * t = Cy + (Dy-Cy) * u  | -Cy
    // Ay - Cy + (By-Ay) * t = (Dy-Cy) * u  |  * (Dx-Cx)

    // (Dx-Cx)(Ay-Cy) + (Dx-Cx)(By-Ay) * t = (Dy-Cy)(Dx-Cx) * u  // 5 lines above


    // (Dx-Cx)(Ay-Cy) + (Dx-Cx)(By-Ay) * t = (Dy-Cy)(Ax-Cx) + (Dy-Cy)(Bx-Ax) * t | -(Dy-Cy)(Ax-Cx)
                                                                                 

    // (Dx-Cx)(Ay-Cy) + (Dx-Cx)(By-Ay) * t - (Dy-Cy)(Ax-Cx) =  (Dy-Cy)(Bx-Ax) * t | -(Dx-Cx)(By-Ay) * t
    
    // (Dx-Cx)(Ay-Cy) - (Dy-Cy)(Ax-Cx) = (Dy-Cy)(Bx-Ax) * t - (Dx-Cx)(By-Ay) * t

    // (Dx-Cx)(Ay-Cy) - (Dy-Cy)(Ax-Cx) = [(Dy-Cy)(Bx-Ax) - (Dx-Cx)(By-Ay)] * t  | /(Dy-Cy)(Bx-Ax) - (Dx-Cx)(By-Ay)

    // [(Dx-Cx)(Ay-Cy) - (Dy-Cy)(Ax-Cx)] / [(Dy-Cy)(Bx-Ax) - (Dx-Cx)(By-Ay)] = t

    // t = top / bottom
    
    // bottom cant be 0
    
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y); //this is form course
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    //can not divide by 0
    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        
        //we only want point if lines cross
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            // 't' is point on AB segment. If we would get 'u' then we should calculate lerp for CD segment
            return {
                x: lineralInterpolation(A.x, B.x, t),
                y: lineralInterpolation(A.y, B.y, t),
                offset: t,
            };
        }
    }
    return null;
}

function polysIntersect(poly1, poly2){
    //console.log(poly1, poly2)

    //checks every segment with every segment
    for(let i = 0; i<poly1.length; i++){
        for(let j = 0; j<poly2.length; j++){
            const touch = getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length], //last point is checked with first point, eg. getIntersection(3,(this one ->)0,0,1)
                poly2[j],
                poly2[(j+1)%poly2.length],
            )
            if(touch){
                return true
            }
        }
    }
    return false
}
