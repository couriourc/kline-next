/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { TextAttrs } from "couriourc-klinecharts";

import type { BaseOverlay } from "./BaseOverlay";

const textInput = {
  name: "textInput",
  totalStep: 2,
  onDoubleClick() {
    return true;
  },
  onSelected(overlayFigure, store) {
    console.log(overlayFigure);
    return true;
  },
  onDeselected() {
    return true;
  },
  onMouseEnter(overlayFigure) {
    console.log(overlayFigure);
    return true;
  },
  createPointFigures(args, store) {
    const texts: TextAttrs[] = args.coordinates.map((coordinate) => {
      return {
        ...coordinate,
        text: store?.attributes.label ?? "",
        baseline: "top"
      };
    });

    return [
      {
        type: "text",
        attrs: texts,
        styles: { color: "#fff", fontSize: 12, fontWeight: "bold" }
      },
      {
        type: "icon",
        attrs: {
          x: args.coordinates[0].x - 8,
          y: args.coordinates[0].y - 8,
          icon: "close"
        },
        styles: { color: "#fff", fontSize: 12, fontWeight: "bold" }
      }
    ];
  }
} as BaseOverlay;
export default textInput;
