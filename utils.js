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
