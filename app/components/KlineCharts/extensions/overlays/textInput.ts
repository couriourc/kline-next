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

import { create } from "./BaseOverlay";
import {
  drawStore,
  pickOverlayId
} from "@/app/components/KlineCharts/stateFn/store";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";

const textInput = create(() => ({
  name: "textInput",
  totalStep: 2,
  createPointFigures: (args) => {
    const id = pickOverlayId(args.overlay.extendData as WrappedOverlay);
    const store = drawStore().get(id);

    if (!store?.attributes.label) {
      return [
        {
          type: "circle",
          attrs: {
            x: args.coordinates[0].x,
            y: args.coordinates[0].y,
            r: 5
          },
          styles: {
            fill: "#ff0000",
            stroke: "#ff0000",
            strokeWidth: 2
          }
        }
      ];
    }
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
      }
    ];
  }
}));

export default textInput;
